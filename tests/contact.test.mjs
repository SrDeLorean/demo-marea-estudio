import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from '../contact.mjs';

const validRequest = {
  name: 'Ana Demo', email: 'ana@example.com', service: 'web',
  message: 'Una página de prueba para un estudio ficticio.', consent: true,
};

// Catches rejecting an otherwise usable request.
test('accepts a complete demo request', () => {
  assert.deepEqual(validateContact(validRequest), { valid: true, errors: {} });
});

// Catches a missing required-field validation or an unsafe default accept.
test('reports every missing required field', () => {
  const result = validateContact({});
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ['consent', 'email', 'message', 'name', 'service']);
  assert.ok(Object.values(result.errors).every(message => typeof message === 'string' && message.length > 0));
});

// Catches removing any individual invalid-value guard.
for (const [field, value] of [
  ['name', ' A '], ['name', 24], ['email', 'ana@'], ['email', 'ana example.com'],
  ['email', 'ana@dominio'], ['service', 'otro'], ['message', 'breve'],
  ['message', 'x'.repeat(2001)], ['consent', false], ['consent', 'true'],
]) {
  test(`rejects invalid ${field}: ${String(value).slice(0, 24)}`, () => {
    const result = validateContact({ ...validRequest, [field]: value });
    assert.equal(result.valid, false);
    assert.deepEqual(Object.keys(result.errors), [field]);
  });
}

// Catches off-by-one boundaries and whitespace handling.
test('accepts trimmed values at the minimum and maximum lengths', () => {
  assert.equal(validateContact({ ...validRequest, name: ' Jo ', email: ' ana@example.com ', message: '1234567890' }).valid, true);
  assert.equal(validateContact({ ...validRequest, message: 'x'.repeat(2000) }).valid, true);
});

// Catches excluding a supported choice from the service contract.
test('accepts all three services', () => {
  for (const service of ['web', 'landing', 'mejora']) {
    assert.equal(validateContact({ ...validRequest, service }).valid, true);
  }
});
