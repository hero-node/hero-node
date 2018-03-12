"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello, Heronode!';
    await next();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXJDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNsQyxHQUFHLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQzlCLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9