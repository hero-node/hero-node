"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const HttpProxy = require("http-proxy");
const pathMatch = require("path-match");
const logger_1 = require("../utils/logger");
const logger = logger_1.LoggerFactory.getLabeledInstance('server', 'proxy');
const proxy = HttpProxy.createProxyServer();
const route = pathMatch({
    // path-to-regexp options
    sensitive: false,
    strict: false,
    end: false,
});
exports.default = (context, options) => (ctx, next) => {
    // create a match function
    const match = route(context);
    if (!match(ctx.path))
        return next();
    return new Promise((resolve, reject) => {
        ctx.req.oldPath = ctx.req.url;
        if (options.rewrite && typeof options.rewrite === 'function')
            ctx.req.url = options.rewrite(ctx.req.url);
        logger.info(`${ctx.req.oldPath} ==> ${url_1.resolve(options.target, ctx.req.url)}`);
        proxy.web(ctx.req, ctx.res, options, e => {
            const status = {
                ECONNREFUSED: 503,
                ETIMEOUT: 504,
            }[e.code];
            if (status)
                ctx.status = status;
            resolve();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDRDQUFnRDtBQUVoRCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUM1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDdEIseUJBQXlCO0lBQ3pCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsR0FBRyxFQUFFLEtBQUs7Q0FDWCxDQUFDLENBQUM7QUFFSCxrQkFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pELDBCQUEwQjtJQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXBDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUM7WUFDM0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSxhQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3BFLENBQUM7UUFFRixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDaEMsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=