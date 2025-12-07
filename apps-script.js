/**
 * Apps Script que recibe los datos del formulario y los añade como nueva fila en Google Sheets.
 */
const SHEET_ID = 'TU_SHEET_ID_AQUÍ';
const SHEET_NAME = 'Respuestas';

function doPost(e) {
  try {
    const payload = e.postData.type === 'application/json'
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
      new Date(),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(500);
  }
}
