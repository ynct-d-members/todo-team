// @ts-check
const path = require("path");
const fs = require("fs");
const util = require("util");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const exec = util.promisify(require("child_process").exec);

const prismaBinary = path.join("node_modules", ".bin", "prisma");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.schemaName = `test_${nanoid()}`;
    this.connectionString =
      process.env.DATABASE_URL +
      "/" +
      process.env.DATABASE_NAME +
      "?schema=" +
      this.schemaName;
    this.dbPath = path.join(__dirname, this.schemaName);
  }

  async setup() {
    await exec(`${prismaBinary} db push --preview-feature`);
    return super.setup();
  }

  async teardown() {
    try {
      await fs.promises.unlink(this.dbPath);
    } catch (error) {}
  }
}

module.exports = PrismaTestEnvironment;
