#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import shelljs from "shelljs";
import addCheckMark from "./checkmark.js";

const argv = process.argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (argv.length <= 2) {
    console.log('Usage: node del.js targets');
    process.exit(0);
}
const targets = argv[2];

console.log("Del " + targets + "\n\n");

const cpy = path.join(__dirname, "../node_modules/del-cli/cli.js");

shelljs.exec('node ' + cpy + ' --force ' + targets, addCheckMark.bind(null, callback));

function callback() {
  console.log(' Deleted ' + targets + '\n\n');
}
