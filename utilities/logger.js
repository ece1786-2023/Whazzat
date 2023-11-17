const {Logging} = require("@google-cloud/logging");
const logging = new Logging();

const jsonLog = async function writeLogEntry(message) {
  const metadata = {
    severity: "DEBUG",
    labels: {
      response: "scheduler_response",
    },
    // A default log resource is added for some GCP environments
    // This log resource can be overwritten per spec:
    // https://cloud.google.com/logging/docs/reference/v2/rest/v2/MonitoredResource
    resource: {
      type: "global",
    },
  };
  const logName = "scheduler_response";
  const log = logging.log(logName);
  const jsonEntry = log.entry(metadata, message);
  // Asynchronously batch write the log entries
  await log.write(jsonEntry);

  console.log(`Wrote to ${logName}`);
};


module.exports = {
  jsonLog,
};

