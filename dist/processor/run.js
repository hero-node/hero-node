"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const logger_1 = require("../utils/logger");
exports.default = () => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'run');
    const port = 7001;
    logger.info(`server will start on port ${port}`);
    server_1.default.listen(port);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThDO0FBQzlDLDRDQUFnRDtBQUVoRCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=