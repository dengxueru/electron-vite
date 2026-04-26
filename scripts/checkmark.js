import chalk from "chalk";

/**
 * Adds mark check symbol
 */
function addCheckMark(callback) {
  process.stdout.write(chalk.green(" ✓"));
  callback();
}

export default addCheckMark;
