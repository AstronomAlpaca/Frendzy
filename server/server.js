const app = require("./app"); // the acual Express apllication
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

// Server listening
server.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT}...`);
});
