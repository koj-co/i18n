import { cosmicSync } from "@anandchowdhary/cosmic";
import axios from "axios";
import { ensureDir, fstat, writeJson } from "fs-extra";
import { join } from "path";

const config = cosmicSync("i18n");
const sheet = config.sheet || 1;

export const i18n = async () => {
  console.log("Starting...");
  const { data } = await axios.get(
    `https://spreadsheets.google.com/feeds/list/${config.sheetId}/${sheet}/public/values?alt=json`
  );
  console.log("Fetched data");
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
  await ensureDir(join(".", "locales"));
  const languages = Object.keys(rows[0]).filter(
    (key) => key.toLocaleLowerCase().trim() !== "key"
  );
  for await (const language of languages) {
    const content: any = {};
    rows.forEach((row) => (content[row.key] = row[language]));
    await writeJson(join(".", "locales", `${language}.json`), content);
    console.log("Created", language);
  }
  console.log("Done!");
};

i18n();
