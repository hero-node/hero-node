import { resolve as urlResolve } from 'url';
import * as HttpProxy from 'http-proxy';
import * as pathMatch from 'path-match';
import { LoggerFactory } from '../utils/logger';

const logger = LoggerFactory.getLabeledInstance('server', 'proxy');

const proxy = HttpProxy.createProxyServer();
const route = pathMatch({
  // path-to-regexp options
  sensitive: false,
  strict: false,
  end: false,
});

export default (context, options) => (ctx, next) => {
  // create a match function
  const match = route(context);
  if (!match(ctx.path)) return next();

  return new Promise(resolve => {
    ctx.req.oldPath = ctx.req.url;

    if (options.rewrite && typeof options.rewrite === 'function')
      ctx.req.url = options.rewrite(ctx.req.url);

    logger.info(
      `${ctx.req.oldPath} ==> ${urlResolve(options.target, ctx.req.url)}`,
    );

    proxy.web(ctx.req, ctx.res, options, e => {
      const status = {
        ECONNREFUSED: 503,
        ETIMEOUT: 504,
      }[e.code];
      if (status) ctx.status = status;
      resolve();
    });
  });
};
