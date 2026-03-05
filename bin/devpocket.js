#!/usr/bin/env node
const { Command } = require("commander");
const init = require("../src/init");

const program = new Command();

program
  .name("devpocket")
  .description("Bootstrap GitHub repositories quickly")
  .version("0.1.0");

program
  .command("init")
  .description("initialize a new project")
  .option("--dir <path>", "output directory", ".")
  .action((opts) => init(opts));

program.parse();