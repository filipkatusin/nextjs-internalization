/* eslint-disable no-console */

import { IFooter, Menu } from "@/lib/interfaces";

const { getMenu, getFooter } = require("../../lib/api");

const fs = require("fs");
const path = require("path");

const writeJsonFile = (filename: string, data: unknown): Promise<void> => {
  return fs.promises.writeFile(filename, JSON.stringify(data || []));
};

const getData = async (basePath: string): Promise<void> => {
  try {
    console.log("Fetching links...");
    const footer: IFooter = await getFooter();
    const menu: Menu[] = await getMenu();
    console.log(`Fetched ${menu.length} links `);

    await writeJsonFile(
      path.join(basePath, "src/data/footer.json"),
      footer || []
    );
    await writeJsonFile(path.join(basePath, "src/data/menu.json"), menu || []);
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
