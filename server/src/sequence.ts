import {AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, RestBindings, Send, SequenceHandler} from '@loopback/rest';
import {performance} from 'perf_hooks';
import {logToFile} from './utils/helpers';

const SequenceActions = RestBindings.SequenceActions;


export class GvSequence implements SequenceHandler {
  /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION) protected authenticateRequest: AuthenticateFn,
  ) { }

  async handle(context: RequestContext) {

    const t0 = performance.now()

    try {
      const {request, response} = context;
      log(context)
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {

      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }

      this.reject(context, err);
      console.error(err)
    }
    this.slowResponseLogging(t0, context);

  }

  /**
   * Logs slow responses
   * @param t0
   * @param context
   */
  private slowResponseLogging(t0: number, context: RequestContext) {
    const t1 = performance.now();
    const time = t1 - t0;

    if (time > 500) {

      console.warn(`WARN Slow response time: ${time}ms, Route: ${context?.request?.path}`);

      const pathEscaped = context?.request?.path.replace(/\/+/g, '-');
      const txt = `${context.request.originalUrl}
      Body:
      ${JSON.stringify(context.request.body, null, 2)}
      `;
      logToFile(txt, `slow-${pathEscaped}`);
    }
  }
}



function log(ctx: RequestContext) {

  const {request} = ctx;
  try {

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
