#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import shelljs from "shelljs";
import addCheckMark from "./checkmark.js";

const argv = process.argv;
let protoName = "marswrapper";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let platform = process.platform;
let arch = process.arch;

if (argv.length > 2) {
    platform = argv[2];
    if(argv.length === 4)
      arch = argv[3];
}

switch (platform) {
    case "darwin":
        protoName += '.mac'
        break;
    case "linux":
        protoName += '.linux'
        if (arch === 'arm64') {
            protoName += '.arm64'
        } else if (arch === 'mips64el') {
            protoName += '.mips64el'
        } else if (arch == 'loong64') {
           protoName += '.loongarch64'
        } else if (arch == 'sw_64') {
           protoName += '.sw64'
        }

        break
    case "win32":
        if (arch === 'ia32') {
            protoName += '.win32'
        } else {
            protoName += '.win64'
        }
        break
    default:
        console.log('unknown platform', process.platform);
        process.exit(0);
}
protoName += '.node'

console.log("Copy " + protoName + "\n\n");

const cpy = path.join(__dirname, "../node_modules/cpy-cli/cli.js ");

// let fromParam = './proto_addon/' + protoName
// let toParam = './'

const fromParam = path.resolve(__dirname, '../proto_addon', protoName);
const toParam = path.resolve(__dirname, '../');
shelljs.exec('node ' + cpy + ' --rename=marswrapper.node ' + fromParam + ' ' + toParam, addCheckMark.bind(null, callback));

function callback() {
    process.stdout.write(' Copied ' + fromParam + ' to the ' + toParam + ' directory\n\n');
}
