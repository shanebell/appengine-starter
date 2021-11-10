import bunyan from "bunyan";
import { LoggingBunyan } from "@google-cloud/logging-bunyan";

const logger = bunyan.createLogger({
  name: "appengine-starter",
  streams: [
    {
      stream: process.stdout,
      level: "debug",
    },

    new LoggingBunyan().stream("debug"),
  ],
});

export default logger;
