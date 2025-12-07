# landigpageexora

## Envío del formulario a Google Sheets

1. Crea una hoja de cálculo en Google Sheets y nómbrala como prefieras.
2. Copia el identificador de la hoja (es la cadena entre `/d/` y `/edit` en la URL) y sustitúyelo en `SHEET_ID` dentro de `apps-script.js`. Cambia `SHEET_NAME` si quieres usar otra pestaña.
3. En Google Sheets, abre **Extensiones → Apps Script** y pega el contenido completo de `apps-script.js`.
4. En Apps Script, ve a **Implementar → Nueva implementación → Aplicación web** y selecciona:
   - **Ejecutar la aplicación como:** Tú mismo.
   - **Quién tiene acceso:** Cualquiera con el enlace.
5. Publica la implementación y copia la URL de la aplicación web (termina en `/exec`).
6. En `index.html`, actualiza la constante `SHEETS_ENDPOINT` con esa URL para que el formulario envíe los datos.

Campos enviados al endpoint:

- `businessName`
- `fullName`
- `phone`
- `email`
- `businessType`
- `employees`
- `message`

## Pruebas manuales recomendadas

1. Abre `index.html` en el navegador.
2. Completa el formulario y envíalo; verifica que se crea una fila nueva en la hoja de cálculo (se añade también la fecha/hora).
3. Desconecta temporalmente la red o introduce un endpoint incorrecto para comprobar el mensaje de error y el botón de reintento.