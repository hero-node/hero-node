"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const server_1 = require("../server");
const logger_1 = require("../utils/logger");
exports.default = options => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'run');
    let port = options.port;
    if (_.isNaN(+port) || port <= 0)
        port = 80;
    else
        port = +port;
    logger.info(`server will start on port ${port}`);
    server_1.default.listen(port);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBQzVCLHNDQUE4QztBQUM5Qyw0Q0FBZ0Q7QUFFaEQsa0JBQWUsT0FBTyxDQUFDLEVBQUU7SUFDdkIsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUN4QixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxFQUFFLENBQUM7O1FBQ3RDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztJQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyJ9