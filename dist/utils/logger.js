"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const _ = require("lodash");
const moment = require("moment");
const winston_1 = require("winston");
class LoggerFactory {
    static getLabeledInstance(category, callee, options) {
        if (!category || _.isEmpty(category))
            category = 'main';
        if (!callee || _.isEmpty(callee))
            callee = '';
        let colorize = true;
        if (_.get(options, 'env') === 'prod' ||
            _.get(options, 'colorize') === false) {
            colorize = false;
        }
        const identity = `${category}-${callee}`;
        let labeledInstance = this._instances.get(identity);
        if (!labeledInstance) {
            labeledInstance = winston_1.createLogger({
                label: callee,
                format: winston_1.format.printf(info => {
                    return `${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} ${chalk_1.default.cyan(info.level)} --- [${chalk_1.default.cyan(category)}:${chalk_1.default.cyan(callee)}]: ${info.message}`;
                }),
                transports: [new winston_1.transports.Console()],
            });
            this._instances.set(identity, labeledInstance);
        }
        return labeledInstance;
    }
}
LoggerFactory._instances = new Map();
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxxQ0FBMkQ7QUErQjNEO0lBR0UsTUFBTSxDQUFDLGtCQUFrQixDQUN2QixRQUFnQixFQUNoQixNQUFjLEVBQ2QsT0FBK0I7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUNELENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLE1BQU07WUFDaEMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssS0FDakMsQ0FBQyxDQUFDLENBQUM7WUFDRCxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUN6QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDckIsZUFBZSxHQUFHLHNCQUFZLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksZUFBSyxDQUFDLElBQUksQ0FDaEUsSUFBSSxDQUFDLEtBQUssQ0FDWCxTQUFTLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFDbEQsSUFBSSxDQUFDLE9BQ1AsRUFBRSxDQUFDO2dCQUNMLENBQUMsQ0FBQztnQkFDRixVQUFVLEVBQUUsQ0FBQyxJQUFJLG9CQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ3pCLENBQUM7O0FBcENNLHdCQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7QUFEaEUsc0NBc0NDIn0=