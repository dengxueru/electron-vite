#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import shelljs from "shelljs";
import addCheckMark from "./checkmark.js";

const argv = process.argv;
let addonName = "wfremotecontrol";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let platform = process.platform;
let arch = process.arch;

if (argv.length > 2) {
    platform = argv[2];
    if (argv.length === 4)
        arch = argv[3];
}

switch (platform) {
    case "darwin":
        addonName += '.darwin'
        break;
    case "linux":
        // addonName += '.linux'
        // if (arch === 'arm64') {
        //     addonName += '.arm64'
        // } else if (arch === 'mips64el') {
        //     addonName += '.mips64el'
        // } else if (arch == 'loong64') {
        //    addonName += '.loongarch64'
        // } else if (arch == 'sw_64') {
        //    addonName += '.sw64'
        // }
        console.log('not support Linux platform', process.platform)
        break
    case "win32":
        if (arch === 'ia32') {
            addonName += '.win32-ia32-msvc'
        } else {
            addonName += '.win32-x64-msvc'
        }
        break
    default:
        console.log('unknown platform', process.platform);
        process.exit(0);
}
addonName += '.node'

console.log("Copy " + addonName + "\n\n");

const cpy = path.join(__dirname, "../node_modules/cpy-cli/cli.js ");

const fromParam = path.resolve(__dirname, '../rc_addon', addonName);
const toParam = path.resolve(__dirname, '../');
shelljs.exec('node ' + cpy + ' --rename=rc.node ' + fromParam + ' ' + toParam, addCheckMark.bind(null, callback));

function callback() {
    process.stdout.write(' Copied ' + fromParam + ' to the ' + toParam + ' directory\n\n');
}
