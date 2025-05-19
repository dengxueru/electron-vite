import { dirname } from "path";
import { fileURLToPath } from "url";

export const fileURL = dirname(fileURLToPath(import.meta.url));
