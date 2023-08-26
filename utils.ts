import fs from "fs/promises";
import fsCallback from "fs";
import { ADDRESSES_FILENAME, CSV_DELIMITER, CSV_FILENAME } from "./constants";

export async function loadAddresses() {
  const file = await fs.readFile(ADDRESSES_FILENAME, { encoding: "utf8" });

  return file.split("\n").filter(Boolean).map((item) => item.trim());
}

const csvLogger = fsCallback.createWriteStream(CSV_FILENAME);

export function writeCsvData(data: (string | number)[]) {
  const line = data.join(CSV_DELIMITER) + "\n";
  csvLogger.write(line);
}

export const delay = (seconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
