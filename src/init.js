const inquirer = require("inquirer").default;
const fs = require("fs-extra");
const path = require("path");

function render(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ""));
}

async function init(options = {}) {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Project name:", default: path.basename(process.cwd()) },
    { type: "input", name: "description", message: "Project description:", default: "My awesome project" },
    { type: "list", name: "license", message: "Choose license:", choices: ["MIT"] }
  ]);

  const outDir = path.resolve(options.dir || ".");
  await fs.ensureDir(outDir);

  const tplDir = path.resolve(__dirname, "..", "templates");

  const vars = {
    ...answers,
    year: new Date().getFullYear()
  };

  const readmeTpl = await fs.readFile(path.join(tplDir, "README.md.tpl"), "utf8");
  const gitignoreTpl = await fs.readFile(path.join(tplDir, "gitignore.tpl"), "utf8");
  const licenseTpl = await fs.readFile(path.join(tplDir, "LICENSE_MIT.tpl"), "utf8");

  await fs.writeFile(path.join(outDir, "README.md"), render(readmeTpl, vars));
  await fs.writeFile(path.join(outDir, ".gitignore"), render(gitignoreTpl, vars));
  await fs.writeFile(path.join(outDir, "LICENSE"), render(licenseTpl, vars));

  console.log(`\n✅ Project initialized successfully in: ${outDir}`);
}

module.exports = init;