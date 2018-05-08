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
    return new Promise(resolve => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDRDQUFnRDtBQUVoRCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUM1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDdEIseUJBQXlCO0lBQ3pCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsR0FBRyxFQUFFLEtBQUs7Q0FDWCxDQUFDLENBQUM7QUFFSCxrQkFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pELDBCQUEwQjtJQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssVUFBVTtZQUMxRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLElBQUksQ0FDVCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRLGFBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDcEUsQ0FBQztRQUVGLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRztnQkFDYixZQUFZLEVBQUUsR0FBRztnQkFDakIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNWLElBQUksTUFBTTtnQkFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==