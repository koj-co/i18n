import { cosmicSync } from "@anandchowdhary/cosmic";
import axios from "axios";

const config = cosmicSync("i18n");
const sheet = config.sheet || 1;

export const i18n = async () => {
  const { data } = await axios.get(
    `https://spreadsheets.google.com/feeds/list/${config.sheetId}/${sheet}/public/values?alt=json`
  );
  const rows: any[] = [];
  if (data && data.feed && data.feed.entry) {
    console.log(data.feed.entry);
    for (let i = 0; i < data.feed.entry.length; i++) {
      const entry = data.feed.entry[i];
      const keys = Object.keys(entry);
      const newRow: any = {};
      for (let j = 0; j < keys.length; j++) {
        const gsxCheck = keys[j].indexOf("gsx$");
        if (gsxCheck > -1) {
          const key = keys[j];
          const name = key.substring(4);
          const content = entry[key];
          const value = content.$t;
          newRow[name] = value;
        }
      }
      rows.push(newRow);
    }
  }
  const languages = Object.keys(rows[0]).filter(
    (key) => key.toLocaleLowerCase().trim() !== "key"
  );
  for await (const language of languages) {
    //
  }
  console.log("rows", rows);
};

i18n();
