export function validateContact(input = {}) {
  const { name, email, service, message, consent } = input;
  const errors = {};
  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Escribe un nombre de al menos 2 caracteres.';
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Escribe un correo válido, por ejemplo ana@example.com.';
  }
  if (!['web', 'landing', 'mejora'].includes(service)) {
    errors.service = 'Selecciona uno de los servicios de la lista.';
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
    errors.message = 'Cuéntanos la idea usando entre 10 y 2000 caracteres.';
  }
  if (consent !== true) {
    errors.consent = 'Confirma que usarás datos ficticios en esta demostración.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
