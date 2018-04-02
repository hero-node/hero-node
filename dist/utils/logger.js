"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const _ = require("lodash");
const moment = require("moment");
const winston_1 = require("winston");
function getFormattedLevel(level, colorize = true) {
    let result;
    if (level) {
        const text = _.toUpper(level);
        if (!!colorize) {
            if (text === 'INFO') {
                result = chalk_1.default.blue(text);
            }
            else if (text === 'WARN') {
                result = chalk_1.default.yellow(text);
            }
            else if (text === 'ERROR') {
                result = chalk_1.default.red(text);
            }
            else {
                result = text;
            }
        }
        result = _.padEnd(`[${result}]`, 19);
    }
    return result;
}
function getFormattedCategory(category, colorize = true) {
    let result;
    if (category) {
        if (!!colorize) {
            result = chalk_1.default.cyan.bold(category);
        }
        else {
            result = category;
        }
    }
    return result;
}
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
                format: winston_1.format.printf(info => {
                    const categoryInfo = getFormattedCategory(category);
                    const calleeInfo = getFormattedCategory(callee)
                        ? `:${getFormattedCategory(callee)}`
                        : '';
                    return `${moment().format('YYYY-MM-DD hh:mm:ss.SSS')} ${getFormattedLevel(info.level, colorize)} --- [${categoryInfo}${calleeInfo}]: ${info.message}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxxQ0FBMkQ7QUErQjNELDJCQUEyQixLQUFhLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDdkQsSUFBSSxNQUFNLENBQUM7SUFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFD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