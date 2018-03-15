"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
exports.default = chainname => {
    const logger = logger_1.LoggerFactory.getLabeledInstance('processor', 'add');
    logger.info(`${chainname} added!`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJwcm9jZXNzb3IvYWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWdEO0FBRWhELGtCQUFlLFNBQVMsQ0FBQyxFQUFFO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyJ9