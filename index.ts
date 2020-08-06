import { google } from "googleapis";
import { cosmicSync } from "@anandchowdhary/cosmic";

const config = cosmicSync("i18n");

const oauth2Client = new google.auth.OAuth2(
  config.googleSheetsClientId,
  config.googleSheetsClientSecret,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  access_token: config.googleSheetsAccess,
  refresh_token: config.googleSheetsRefresh,
});

const sheets = google.sheets("v4");

export const i18n = async () => {
  console.log("Starting i18n...");
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: config.sheetId,
    range: "A1:A10",
  });
  console.log(result);
};

i18n();
