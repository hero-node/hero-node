"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpProxy = require("http-proxy");
const pathMatch = require("path-match");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFFeEMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDNUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3RCLHlCQUF5QjtJQUN6QixTQUFTLEVBQUUsS0FBSztJQUNoQixNQUFNLEVBQUUsS0FBSztJQUNiLEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNqRCwwQkFBMEI7SUFDMUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVwQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDaEMsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=