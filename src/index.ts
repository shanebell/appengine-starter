import { initApp } from "./app";
import logger from "./logger";

const app = initApp();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});
