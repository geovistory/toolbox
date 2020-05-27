import {Middleware} from '@loopback/rest';

export const log: Middleware = async (middlewareCtx, next) => {

  const {request} = middlewareCtx;
  try {
    // Proceed with next middleware
    await next();

    if (process.env.NO_LOGS === 'true') return;

    // Process response
    console.log(
      `
\u{1b}[35m Request \u{1b}[34m ${new Date().toString()}  \u{1b}[0m
    \u{1b}[33m Method: \u{1b}[0m ${request.method}
    \u{1b}[33m originalUrl: \u{1b}[0m ${request.originalUrl}
    \u{1b}[33m Path: \u{1b}[0m ${request.path}
    \u{1b}[33m Header > authorization: \u{1b}[0m ${request.headers.authorization}
    \u{1b}[33m Query > access_token: \u{1b}[0m ${request.query.access_token}
            `)
  } catch (err) {
    // Catch errors from downstream middleware
    console.error(
      'Error received for %s %s',
      request.method,
      request.originalUrl,
    );
    throw err;
  }

}
