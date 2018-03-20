"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const winston_1 = require("winston");
class LoggerFactory {
    static getLabeledInstance(category, callee, options) {
        if (!category || _.isEmpty(category))
            category = 'default';
        if (!callee || _.isEmpty(callee))
            callee = 'default';
        let colorize = true;
        if (_.get(options, 'env') === 'prod' ||
            _.get(options, 'colorize') === false)
            colorize = false;
        const identity = `${category}-${callee}`;
        let labeledInstance = this._instances.get(identity);
        if (!labeledInstance) {
            labeledInstance = winston_1.createLogger({
                label: callee,
                format: winston_1.format.printf(info => {
                    return `${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} ${_.padEnd(info.level, 7)} --- [${category}] ${callee}: ${info.message}`;
                }),
                transports: [new winston_1.transports.Console({ colorize: colorize })],
            });
            this._instances.set(identity, labeledInstance);
        }
        return labeledInstance;
    }
}
LoggerFactory._instances = new Map();
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLHFDQUEyRDtBQStCM0Q7SUFHRSxNQUFNLENBQUMsa0JBQWtCLENBQ3ZCLFFBQWdCLEVBQ2hCLE1BQWMsRUFDZCxPQUErQjtRQUUvQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUNyRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQ0QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssTUFBTTtZQUNoQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxLQUNqQyxDQUFDO1lBQ0MsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNuQixNQUFNLFFBQVEsR0FBRyxHQUFHLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUN6QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDckIsZUFBZSxHQUFHLHNCQUFZLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FDOUQsSUFBSSxDQUFDLEtBQUssRUFDVixDQUFDLENBQ0YsU0FBUyxRQUFRLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDO2dCQUNGLFVBQVUsRUFBRSxDQUFDLElBQUksb0JBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM3RCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7QUEvQk0sd0JBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztBQURoRSxzQ0FpQ0MifQ==