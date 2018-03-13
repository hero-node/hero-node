"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const _ = require("lodash");
const Router = require('koa-router');
const IPFS = require('ipfs-api');
const router = new Router();
const ipfs = IPFS({
    host: 'localhost',
    port: 5001,
    protocol: 'http',
});
const uploadAsync = util_1.promisify(ipfs.files.add);
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello, Heronode!';
    await next();
});
router.post('/api/ipfs/upload/raw', async (ctx, next) => {
    const body = ctx.request.body;
    const content = _.get(body, 'content');
    if (!content) {
        console.log('body content is empty!');
        ctx.status = 500;
        ctx.body = 'please make sure content field is not empty';
        await next;
        return;
    }
    console.log(`uploading content: ${content}`);
    const resp = await uploadAsync(Buffer.from(content));
    console.log(resp);
    ctx.body = resp;
    await next;
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlDO0FBQ2pDLDRCQUE0QjtBQUU1QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxJQUFJO0lBQ1YsUUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbEMsR0FBRyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztJQUM5QixNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsNkNBQTZDLENBQUM7UUFDekQsTUFBTSxJQUFJLENBQUM7UUFDWCxNQUFNLENBQUM7SUFDVCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixNQUFNLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=