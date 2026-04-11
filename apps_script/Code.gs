const SHEET_NAME = "responses";
const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd54-q6vCQKv1NIOJdccAFiJDbcDC69Oqa_hNhVckd_KH237g/formResponse";
const GOOGLE_FORM_ENTRIES = {
  guestType: "entry.693435807",
  name: "entry.171815300",
  furigana: "entry.2021811141",
  postcode: "entry.1654798255",
  address: "entry.2006166490",
  phone: "entry.1537915464",
  allergy: "entry.1254300178",
  allergyDetail: "entry.32593815",
  ceremony: "entry.1298471478",
  reception: "entry.1934073530",
};

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
    const formResult = submitToGoogleForm_(payload);
    const logResult = appendResponseLog_(payload);

    return jsonOutput_({
      ok: true,
      destination: "google-form-and-log",
      formStatus: formResult.status,
      logSheetName: logResult.sheetName,
      logRow: logResult.row,
    });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: String(error),
    });
  }
}

function submitToGoogleForm_(payload) {
  const formPayload = {};

  Object.entries(GOOGLE_FORM_ENTRIES).forEach(([key, entryId]) => {
    formPayload[entryId] = payload[key] || "";
  });

  const response = UrlFetchApp.fetch(GOOGLE_FORM_ACTION_URL, {
    method: "post",
    payload: formPayload,
    followRedirects: true,
    muteHttpExceptions: true,
  });

  const status = response.getResponseCode();
  if (status < 200 || status >= 400) {
    throw new Error(`Google Form request failed: ${status}`);
  }

  return { status };
}

function appendResponseLog_(payload) {
  const sheet = getOrCreateSheet_(SHEET_NAME);

  ensureHeader_(sheet, [
    "loggedAt",
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
    new Date(),
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

  return {
    sheetName: sheet.getName(),
    row: sheet.getLastRow(),
  };
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
