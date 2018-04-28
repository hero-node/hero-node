"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFDeEMsNENBQWdEO0FBRWhELE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRW5FLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQzVDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUN0Qix5QkFBeUI7SUFDekIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsTUFBTSxFQUFFLEtBQUs7SUFDYixHQUFHLEVBQUUsS0FBSztDQUNYLENBQUMsQ0FBQztBQUVILGtCQUFlLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakQsMEJBQTBCO0lBQzFCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQztZQUMzRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLElBQUksQ0FDVCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRLGFBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDcEUsQ0FBQztRQUVGLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRztnQkFDYixZQUFZLEVBQUUsR0FBRztnQkFDakIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==