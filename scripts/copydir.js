#!/usr/bin/env node

import copydir from "copy-dir";

const argv = process.argv;
if (argv.length <= 3) {
    console.log('Usage: node copydir.js from to');
    process.exit(0);
}
const fromParam = argv[2];
const toParam = argv[3];

console.log("Try copy " + fromParam + " to " + toParam + "\n\n")

copydir.sync(fromParam, toParam, {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});

process.stdout.write(' Copied ' + fromParam + ' to the ' + toParam + ' \n\n');
