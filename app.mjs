import { validateContact } from './contact.mjs';

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const fields = ['name', 'email', 'service', 'message', 'consent'];

function clearFeedback() {
  for (const field of fields) {
    form.elements[field].removeAttribute('aria-invalid');
    document.getElementById(`${field}-error`).textContent = '';
  }
  status.textContent = '';
  status.classList.remove('success');
}

// Keep the submit button disabled until this local-only handler is installed.
form.addEventListener('submit', event => {
  event.preventDefault();
  clearFeedback();
  const result = validateContact({
    name: form.elements.name.value,
    email: form.elements.email.value,
    service: form.elements.service.value,
    message: form.elements.message.value,
    consent: form.elements.consent.checked,
  });
  if (!result.valid) {
    for (const [field, message] of Object.entries(result.errors)) {
      form.elements[field].setAttribute('aria-invalid', 'true');
      document.getElementById(`${field}-error`).textContent = message;
    }
    status.textContent = 'Revisa los campos indicados para continuar con la prueba.';
    form.elements[Object.keys(result.errors)[0]].focus();
    return;
  }
  status.classList.add('success');
  status.textContent = 'Prueba completada. Tu solicitud ficticia se ha validado en esta página. No se envió ni se guardó ningún dato.';
  form.reset();
  status.focus();
});
document.querySelector('#demo-submit').disabled = false;

document.querySelector('#fill-example').addEventListener('click', () => {
  clearFeedback();
  form.elements.name.value = 'Ana Demo';
  form.elements.email.value = 'ana@example.com';
  form.elements.service.value = 'web';
  form.elements.message.value = 'Imaginemos un sitio para un taller ficticio de cerámica, con sus servicios y una galería de ejemplo.';
  form.elements.consent.checked = false;
  status.textContent = 'Ejemplo ficticio completado. Revisa los campos y confirma que entiendes que es una demo.';
  form.elements.name.focus();
});

for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => {
    clearFeedback();
    form.elements.service.value = link.dataset.service;
  });
}
