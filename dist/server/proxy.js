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
    console.log(ctx.req);
    return new Promise(resolve => {
        ctx.req.oldPath = ctx.req.url;
        if (options.rewrite && typeof options.rewrite === 'function')
            ctx.req.url = options.rewrite(ctx.req.url);
        logger.info(`${ctx.req.oldPath} ==> ${url_1.resolve(options.target, ctx.req.url)}`);
        proxy.web(ctx.req, ctx.res, options, e => {
            console.log(123, e);
            console.log(ctx);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDRDQUFnRDtBQUVoRCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUM1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDdEIseUJBQXlCO0lBQ3pCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsR0FBRyxFQUFFLEtBQUs7Q0FDWCxDQUFDLENBQUM7QUFFSCxrQkFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pELDBCQUEwQjtJQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXJCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUM7WUFDM0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSxhQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3BFLENBQUM7UUFFRixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLE1BQU0sR0FBRztnQkFDYixZQUFZLEVBQUUsR0FBRztnQkFDakIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==