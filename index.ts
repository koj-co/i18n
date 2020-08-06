import { config } from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";
config();

export const i18n = async () => {
  console.log("Starting i18n generator...");
};

i18n();
