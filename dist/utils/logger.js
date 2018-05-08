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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyxxQ0FBMkQ7QUErQjNELDJCQUEyQixLQUFhLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDdkQsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2QsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNuQixNQUFNLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtpQkFBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsTUFBTSxHQUFHLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNmO1NBQ0Y7UUFDRCxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELDhCQUE4QixRQUFRLEVBQUUsUUFBUSxHQUFHLElBQUk7SUFDckQsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLFFBQVEsRUFBRTtRQUNaLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNkLE1BQU0sR0FBRyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUNuQjtLQUNGO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEO0lBR0UsTUFBTSxDQUFDLGtCQUFrQixDQUN2QixRQUFnQixFQUNoQixNQUFlLEVBQ2YsT0FBK0I7UUFFL0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUFFLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQ0UsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssTUFBTTtZQUNoQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQ3BDO1lBQ0EsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUNsQjtRQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3pDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsZUFBZSxHQUFHLHNCQUFZLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxZQUFZLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BELE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQzt3QkFDN0MsQ0FBQyxDQUFDLElBQUksb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ1AsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FDdkIseUJBQXlCLENBQzFCLElBQUksaUJBQWlCLENBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQ1YsUUFBUSxDQUNULFNBQVMsWUFBWSxHQUFHLFVBQVUsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFELENBQUMsQ0FBQztnQkFDRixVQUFVLEVBQUUsQ0FBQyxJQUFJLG9CQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7QUF4Q00sd0JBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztBQURoRSxzQ0EwQ0MifQ==