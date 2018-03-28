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
        result = _.padEnd(`[${result}]`, 9, ' ');
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
                label: category,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxxQ0FBMkQ7QUErQjNELDJCQUEyQixLQUFhLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDdkQsSUFBSSxNQUFNLENBQUM7SUFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFB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