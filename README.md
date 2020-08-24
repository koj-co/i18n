# 🌐 Koj I18N

This repository contains our internationalization files, synced every hour from Google Sheets, so they're version controlled i18n files with git. On built time, our website fetches them from here.

[![Update CI](https://github.com/koj-co/i18n/workflows/Update%20CI/badge.svg)](https://github.com/koj-co/i18n/actions?query=workflow%3A%22Update+CI%22)
[![Trigger CI](https://github.com/koj-co/i18n/workflows/Trigger%20CI/badge.svg)](https://github.com/koj-co/i18n/actions?query=workflow%3A%22Trigger+CI%22)

## ⭐ How it works

Every hour, a GitHub Actions workflow generates the files in the [`./locales`](./locales) directory from a Google Sheets spreadsheet with the following layout:

| key  | en-ch         | de-ch        |
| ---- | ------------- | ------------ |
| key1 | Value English | Value German |

In this spreadsheet, the cell `A1` should be "key", and `B1`...`X1` should be language codes.

The generated file [`./locales/de-ch.json`](./locales/de-ch.json), for example, would be:

```json
{
  "key1": "Value German"
}
```

### Configuration

The following environment variables are required:

- `SHEET_ID` is the Google Sheet ID (see [How to do I locate a Google Sheets ID?](https://stackoverflow.com/a/36062068/1656944))
- `BUILD_WEBHOOK` is the webhook to call after completing the process (optional)

You can also create a `.i18nrc` file in the root of your project instead, with the keys `sheetId` and `buildWebhook`:

```json
{
  "sheetId": "example",
  "buildWebhook": "https://example.com/post"
}
```

## 👩‍💻 Development

Run process locally:

```bash
npm run start
```

## 📄 License

The code in this repository, with the exception of the `locales` folder, are licensed under [MIT](./LICENSE.MIT).

The contents of the `locales` folder are licensed under [CC-BY-4.0](./LICENSE.CC).

<p align="center">
  <a href="https://koj.co">
    <img width="44" alt="Koj" src="https://kojcdn.com/v1598284251/website-v2/koj-github-footer_m089ze.svg">
  </a>
</p>
<p align="center">
  <sub>An open source project by <a href="https://koj.co">Koj</a>. <br> <a href="https://koj.co">Furnish your home in style, for as low as CHF175/month →</a></sub>
</p>
