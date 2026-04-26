#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import shelljs from "shelljs";
import addCheckMark from "./checkmark.js";

const argv = process.argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (argv.length <= 3) {
    console.log('Usage: node copy.js from to');
    process.exit(0);
}
const fromParam = argv[2];
const toParam = argv[3];

console.log("Try copy " + fromParam + " to " + toParam + "\n\n");

const cpy = path.join(__dirname, "../node_modules/cpy-cli/cli.js ");

shelljs.exec('node ' + cpy + ' ' + fromParam + ' ' + toParam, addCheckMark.bind(null, callback));

function callback() {
  process.stdout.write(' Copied ' + fromParam + ' to the ' + toParam + ' directory\n\n');
}
