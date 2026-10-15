import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import inquirer from "inquirer";

const databaseName = "CRUD_Activity_1_3";

const rootSequelize = new Sequelize(
  "mysql://root:ogbactrisha@localhost:3306/",
  {
    logging: false,
  }
);

try {
  const { createDb } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createDb",
      message: `Database '${databaseName}' may not exist. Create it?`,
      default: true,
    },
  ]);

  if (createDb) {
    await rootSequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`
    );

    console.log("✅ Database created (if it did not exist)");
  }

  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");

  await sequelize.sync({ force: true });
  console.log("✅ Tables created for all models!");
} catch (err) {
  console.error("❌ Migration failed:", err);
  process.exitCode = 1;
} finally {
  await sequelize.close();
  await rootSequelize.close();
}