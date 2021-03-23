// @ts-check
const path = require("path");
const util = require("util");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const exec = util.promisify(require("child_process").exec);
const { Client } = require("pg");
require("dotenv").config();

const prismaBinary = path.join("node_modules", ".bin", "prisma");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.schemaName = `test_${nanoid()}`;
    this.connectionString =
      process.env.DATABASE_URL_WITH_NAME + "?schema=" + this.schemaName;
    process.env.DATABASE_URL_WITH_NAME = this.connectionString;
    this.global.process.env.DATABASE_URL_WITH_NAME = this.connectionString;
  }

  async setup() {
    try {
      await exec(`${prismaBinary} db push --preview-feature`);
      return super.setup();
    } catch (e) {
      console.error(e);
    }
  }

  async teardown() {
    try {
      const pgClient = new Client({
        connectionString: process.env.DATABASE_URL_WITH_NAME,
      });
      await pgClient.connect();
      await pgClient.query(
        `DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE`
      );
      await pgClient.end();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PrismaTestEnvironment;
