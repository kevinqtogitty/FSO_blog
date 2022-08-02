const http = require("http");
const app = require("./app");

//Import the router for /api/routes
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
