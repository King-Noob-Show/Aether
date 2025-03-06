const fs = require("fs");
const path = require("path");
const c = require("ansi-colors");

function errorHandler() {
  const logFilePath = path.join(__dirname, "errors.txt");

  console.log(c.redBright.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(c.redBright.bold("[ERROR HANDLER] Starting Error Handlers..."));

  // Function to log errors to the file
  function logErrorToFile(type, error) {
    const errorMessage =
      error?.stack ||
      error?.message ||
      JSON.stringify(error, null, 2) ||
      "[ERROR] Unknown Error";
    const logEntry = `[${new Date().toISOString()}] [${type}] ${errorMessage}\n\n`;

    fs.appendFileSync(logFilePath, logEntry);
  }

  // Error Handlers
  process.on("unhandledRejection", (reason, p) => {
    console.error(c.red.bold(" [ERROR] Unhandled Rejection/Catch"));
    // console.error(reason?.stack || reason); // Ensure stack trace is logged if available
    logErrorToFile("Unhandled Rejection", reason);
  });

  process.on("uncaughtException", (err, origin) => {
    console.error(c.red.bold(" [ERROR] Uncaught Exception/Catch"));
    // console.error(err?.stack || err); // Log stack trace for debugging
    logErrorToFile("Uncaught Exception", err);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(c.red.bold(" [ERROR] Uncaught Exception/Catch (MONITOR)"));
    console.log(c.red.bold(err), origin);
    logErrorToFile("Uncaught Exception Monitor", err);
  });

  console.log(c.redBright.bold("[ERROR HANDLER] Started Error Handlers"));
  console.log(c.redBright.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
}

module.exports = errorHandler;
