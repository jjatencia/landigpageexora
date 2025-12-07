# landigpageexora

## Envío del formulario a Google Sheets

1. Crea una hoja de cálculo en Google Sheets y nómbrala como prefieras.
2. Abre **Extensiones → Apps Script** y pega el contenido de `apps-script.js` (ajusta el `SHEET_ID` y, si quieres, `SHEET_NAME`).
3. En Apps Script, ve a **Implementar → Nueva implementación → Aplicación web** y selecciona:
   - **Ejecutar la aplicación como:** Tú mismo.
   - **Quién tiene acceso:** Cualquiera con el enlace.
4. Publica la implementación y copia la URL de la aplicación web.
5. En `index.html`, actualiza `SHEETS_ENDPOINT` con esa URL para que el formulario envíe los datos a la hoja.

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
2. Completa el formulario y envíalo; verifica que se crea una fila nueva en la hoja de cálculo.
3. Desconecta temporalmente la red o introduce un endpoint incorrecto para comprobar el mensaje de error y el botón de reintento.