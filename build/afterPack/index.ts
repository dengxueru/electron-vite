import type { AfterPackContext } from "electron-builder";
import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const afterPack = (context: AfterPackContext) => {
  const localesPath = join(context.appOutDir, "locales");
  if (!existsSync(localesPath)) {
    return;
  }
  const keep = ["zh-CN.pak"];
  const files = readdirSync(localesPath);
  files.forEach((file) => {
    if (!keep.includes(file)) {
      unlinkSync(join(localesPath, file));
    }
  });
};

export default afterPack;
