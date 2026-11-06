# Marea Estudio

**Proyecto de demostración.** Marea Estudio es una marca ficticia de servicios profesionales creada como muestra de portafolio y como piloto de un coordinador de desarrollo. No representa clientes, servicios contratables ni resultados comerciales reales.

Incluye diseño responsive, servicios, proceso, preguntas frecuentes y formulario accesible. HTML, CSS y módulos JavaScript; sin compilación ni dependencias de aplicación.

## Probar la web

Servir esta carpeta con un servidor HTTP estático. Por ejemplo, con Node y npm disponibles:

```sh
npx --yes http-server . -a 127.0.0.1 -p 4173 -c-1
```

Abrir http://127.0.0.1:4173. Se necesita HTTP para cargar los módulos JavaScript; abrir el archivo directamente mediante `file://` puede impedir su ejecución.

El formulario valida los campos y muestra una confirmación local. **No envía correos, no realiza llamadas de red ni almacena solicitudes.** Utilizar únicamente datos ficticios. Los vínculos de regreso a Pulpo se utilizan cuando la demo está montada dentro del coordinador; no incluyen acceso al coordinador privado.

## Pruebas

```sh
npm test
```

Las pruebas nativas de Node comprueban aceptación de datos ficticios válidos, campos obligatorios, correo, servicios, consentimiento y límites del mensaje. No requieren instalar paquetes ni conectarse a servicios externos.

## Archivos

- `index.html`: contenido y estructura accesible.
- `styles.css`: presentación y adaptación móvil.
- `app.mjs`: interacciones del formulario y selección de servicio.
- `contact.mjs`: validación independiente del navegador.
- `tests/contact.test.mjs`: contrato de validación.

No contiene credenciales, información de clientes ni el código del coordinador privado. La creación de este repositorio no configura un despliegue web.
