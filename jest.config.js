const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    path.join(__dirname, "src/public/js/configs/test_setup.ts")
  ]
};
