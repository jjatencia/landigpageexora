const SHEET_ID = '1pZiW0Aeob95EcbG4SJHqzfJj4DIbFNz8qpv1mGhZiMo';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    // Recibimos los campos enviados por FormData
    const payload = e.parameter;

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    sheet.appendRow([
      new Date(),                      // Fecha/Hora
      payload.businessName || '',      // Nombre del negocio
      payload.fullName || '',          // Nombre y apellidos
      payload.phone || '',             // Teléfono
      payload.email || '',             // Email
      payload.businessType || '',      // Tipo de negocio
      payload.employees || '',         // Nº de empleados
      payload.message || '',           // Mensaje
    ]);

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    console.error(error);
    return ContentService
      .createTextOutput('ERROR: ' + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
