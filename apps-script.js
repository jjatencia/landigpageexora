/**
 * Apps Script que recibe los datos del formulario y los añade como nueva fila en Google Sheets.
 */
const SHEET_ID = '1pZiW0Aeob95EcbG4SJHqzfJj4DIbFNz8qpv1mGhZiMo'; // ID del documento
const SHEET_NAME = 'Leads'; // Nombre de la pestaña

const buildResponse = (payload, statusCode) => {
  const output = ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);

  // OJO: setHeader no siempre es necesario para Apps Script Web App,
  // pero lo dejamos por si el entorno lo respeta.
  try {
    output.setHeader('Access-Control-Allow-Origin', '*');
    output.setHeader('Access-Control-Allow-Methods', 'POST');
    output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } catch (e) {
    // Si no soporta setHeader, simplemente lo ignoramos.
  }

  if (statusCode) {
    try {
      output.setResponseCode(statusCode);
    } catch (e) {
      // Algunos entornos no soportan esto, no pasa nada.
    }
  }

  return output;
};

function doPost(e) {
  try {
    const payload = e.postData && e.postData.type === 'application/json'
      ? JSON.parse(e.postData.contents)
      : e.parameter;

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    sheet.appendRow([
      payload.businessName || '',
      payload.fullName || '',
      payload.phone || '',
      payload.email || '',
      payload.businessType || '',
      payload.employees || '',
      payload.message || '',
      new Date(), // Fecha/hora
    ]);

    return buildResponse({ success: true });
  } catch (error) {
    console.error(error);
    return buildResponse({ success: false, error: error.message }, 500);
  }
}
