# Gestión viviendas turísticas Galicia

Web de `gestionvutgalicia.es`, preparada para GitHub Pages y creada con Next.js exportado como sitio estático.

## Estructura de la carpeta

- Raíz del proyecto: web publicada. Estos archivos son los que sirve GitHub Pages.
- `codigo-fuente/`: código editable de la web en Next.js.
- `images/`: imágenes optimizadas que usa la web publicada.
- `documentacion/`: checklists de QA, SEO y accesibilidad.
- `CNAME`: dominio personalizado `gestionvutgalicia.es`.
- `googlec9519ca6bb9f861e.html`: archivo de verificación de Google Search Console.
- `sitemap.xml` y `robots.txt`: archivos para buscadores.

## Datos actuales

- WhatsApp: `+34 620 089 622`
- Email: `luisligero1@gmail.com`
- Dominio: `https://gestionvutgalicia.es/`

Los datos principales se editan en:

`codigo-fuente/src/config/brand.ts`

## Formulario

La web es estática y no guarda datos en base de datos. El formulario prepara la solicitud y permite enviarla por:

- WhatsApp, con el mensaje ya rellenado.
- Correo, mediante `mailto:` con asunto y cuerpo preparados.

Para guardar leads automáticamente haría falta conectar un servicio externo, por ejemplo Formspree, Brevo, Resend, Google Sheets, Airtable, Notion o HubSpot.

## Cómo editar y publicar cambios

1. Entra en `codigo-fuente/`.
2. Ejecuta `npm install` si no existe `node_modules`.
3. Edita los componentes o textos.
4. Ejecuta `npm run build`.
5. Copia el contenido de `codigo-fuente/out/` a la raíz del proyecto.
6. Haz commit y push a GitHub.
7. GitHub Pages publicará la nueva versión.

## Qué no borrar

- `CNAME`
- `.nojekyll`
- `googlec9519ca6bb9f861e.html`
- `_next/`
- `index.html`
- Las carpetas de cada página: `contacto/`, `servicios/`, `tramites-vut-galicia/`, etc.
- `images/`

## Documentación

Consulta:

- `documentacion/QA_CHECKLIST.md`
- `documentacion/SEO_CHECKLIST.md`
- `documentacion/ACCESSIBILITY_CHECKLIST.md`
