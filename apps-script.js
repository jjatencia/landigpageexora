/**
 * Apps Script que recibe los datos del formulario y los añade como nueva fila en Google Sheets.
 */
const SHEET_ID = 1pZiW0Aeob95EcbG4SJHqzfJj4DIbFNz8qpv1mGhZiMo;
const SHEET_NAME = leads;

const buildResponse = (payload, statusCode) => {
  const output = ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);

  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'POST');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (statusCode) {
    output.setResponseCode(statusCode);
  }

  return output;
};

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

    return buildResponse({ success: true });
  } catch (error) {
    console.error(error);
    return buildResponse({ success: false, error: error.message }, 500);
  }
}
