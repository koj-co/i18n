import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet("<the sheet ID from the url>");

export const i18n = async () => {
  console.log("Starting i18n generator...");
};

i18n();
