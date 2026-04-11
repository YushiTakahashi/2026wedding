const SHEET_NAME = "responses";

function doGet() {
  return jsonOutput_({
    ok: true,
    message: "Apps Script is running",
    sheetName: SHEET_NAME,
  });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getOrCreateSheet_(SHEET_NAME);

    ensureHeader_(sheet, [
      "submittedAt",
      "name",
      "furigana",
      "guestType",
      "postcode",
      "address",
      "phone",
      "allergy",
      "allergyDetail",
      "ceremony",
      "reception",
    ]);

    sheet.appendRow([
      payload.submittedAt || "",
      payload.name || "",
      payload.furigana || "",
      payload.guestType || "",
      payload.postcode || "",
      payload.address || "",
      payload.phone || "",
      payload.allergy || "",
      payload.allergyDetail || "",
      payload.ceremony || "",
      payload.reception || "",
    ]);

    return jsonOutput_({
      ok: true,
      sheetName: sheet.getName(),
      row: sheet.getLastRow(),
    });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: String(error),
    });
  }
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const existing = spreadsheet.getSheetByName(sheetName);
  if (existing) return existing;
  return spreadsheet.insertSheet(sheetName);
}

function ensureHeader_(sheet, header) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(header);
}

function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
