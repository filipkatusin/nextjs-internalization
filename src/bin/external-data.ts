/* eslint-disable no-console */

import { IFooter, Menu, Titles } from "@/lib/interfaces";

const { getMenu, getFooter, getTitles, getHeader } = require("../../lib/api");

const fs = require("fs");
const path = require("path");

const writeJsonFile = (
  filename: string,
  text: string,
  data: unknown
): Promise<void> => {
  return fs.promises.writeFile(filename, text + JSON.stringify(data || []));
};

const getData = async (basePath: string): Promise<void> => {
  try {
    console.log("Fetching links...");
    const footer: IFooter = await getFooter();
    const menu: Menu[] = await getMenu();
    const titles: Titles = await getTitles("footer");
    const header = await getHeader();
    console.log(`Fetched ${menu.length} links `);
    console.log(`Fetched ${footer}`);

    await writeJsonFile(
      path.join(basePath, "src/data/footer.js"),
      "export const footer = ",
      footer || []
    );
    await writeJsonFile(
      path.join(basePath, "src/data/menu.js"),
      "export const menu = ",
      menu || []
    );
    await writeJsonFile(
      path.join(basePath, "src/data/titles.js"),
      "export const titles = ",
      titles || []
    );
    await writeJsonFile(
      path.join(basePath, "src/data/header.js"),
      "export const header = ",
      header || []
    );
  } catch (err) {
    console.error(err);
  }
};

export const main = async (): Promise<void> => {
  const basePath: string = process.cwd();
  await Promise.all([getData(basePath)]);
};

if (module.children) {
  main().then();
}

const emptyDefault = {};

export default emptyDefault;