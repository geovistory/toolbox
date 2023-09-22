import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {AuthorizationBindings, AuthorizationComponent, AuthorizationDecision, AuthorizationOptions} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings, RestServer} from '@loopback/rest';
import {RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {AuthorizationPolicyComponent} from './components/authorization';
import {JWTBindings, JWTComponent, JWTComponentConfig} from './components/jwt';
import {BasicAuthenticationStrategy} from './components/jwt/basic-authentication.strategy';
import {DefaultFactory, InvokeFactory, LOGGER_LEVEL, LoggingBindings, LoggingComponent, LoggingComponentConfig} from './components/logger';
import {SpecEnhancerComponent} from './components/spec-enhancer/spec-enhancer.component';
import {SysStatusController} from './controllers';
import {ImportTableController} from './controllers/import-table.controller';
import {FieldChangeController} from './controllers/project-data/field-change.controller';
import {WarEntityPreviewController} from './controllers/war-entity-preview.controller';
import {Postgres1DataSource} from './datasources/postgres1.datasource';
import {log} from './middleware/log.middleware';
import {PostgresNotificationsManager} from './realtime/db-listeners/postgres-notifications-manager';
import {Streams} from './realtime/streams/streams';
import {WebSocketServer} from './realtime/websockets/websocket.server';
import {GvSequence} from './sequence';
import {AccountService} from './services/account.service';
import {EmailService} from './services/email.service';
import {PasswordResetTokenService} from './services/password-reset-token.service';
import {setupPostgresFunctions} from './startup/setupPostgresFunctions';
import {NodeENV} from './utils/code.utils';
import {getGvPgUrlForLoopback} from './utils/databaseUrl';


export class GeovistoryApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {

  streams = new Streams()
  wsServer: WebSocketServer;
  pgNotifManager: PostgresNotificationsManager;
  url?: string;

  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.bind('app').toClass(GeovistoryApplication)


    this.bind('APP_EMAIL_SERVICE').toClass(EmailService)
    this.bind('APP_ACCOUNT_SERVICE').toClass(AccountService)
    this.bind('APP_PASSWORD_RESET_TOKEN_SERVICE').toClass(PasswordResetTokenService)

    // Increase body size for table imports
    this.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({limit: '500mb'})

    // make the streams injectable
    this.bind('streams').to(this.streams)


    // Set up the custom sequence
    this.sequence(GvSequence);

    // Set up log middleware
    this.middleware(log)

    // Set up static files
    this.registerStaticFiles();


    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      }
    };

    this.setupComponents()

    registerAuthenticationStrategy(this, BasicAuthenticationStrategy);

    const config = {
      url: getGvPgUrlForLoopback(),
      name: 'postgres1',
      connector: 'postgresql',
      ssl: {
        rejectUnauthorized: true,
      },
      type: ''
    };
    this.bind('datasources.config.postgres1').to(config)
    // Bind datasource
    //TODO: is 2nd param needed?
    this.dataSource(Postgres1DataSource, 'datasources.postgres1');

    this.onInit(() => {
      this.setupPostgresFunctions()
        .then(() => {
          console.log('Successfully setup postgres functions')
        })
        .catch(err => {
          console.error('Cannot setup postgres functions.', err);
          process.exit(1);
        });
    })

    this.onStart(async () => {

      this.url = this.restServer.url;
      // Websocket server
      if (this.restServer.httpServer?.server)
        await this.wsServer.start(this.restServer.httpServer.server);
      else {
        console.error('Cannot start webserver');
        process.exit(1);
      }

      // Postgres Notification Manager
      return this.pgNotifManager.start()
    })

    this.onStop(async () => {
      // Websocket server
      await this.wsServer.stop();

      // Postgres Notification Manager
      return this.pgNotifManager.stop()
    })
  }

  start = async () => {
    await super.start();

    if (!this.options?.disableConsoleLog) {
      const rest = await this.getServer(RestServer);
      console.log(
        `REST server running at ${rest.url}`,
      );
    }
  }

  private setupComponents() {
    this.setupRestExplorerComponent();
    this.setupWebsocketsComponent();
    this.setupJWTComponent();
    this.setupAuthorizationComponent();
    this.setupSpecEnhancerComponent()

  }

  async setupPostgresFunctions() {
    const c: Postgres1DataSource = await this.get('datasources.postgres1')
    await setupPostgresFunctions(c);
  }

  private setupRestExplorerComponent() {
    this.component(RestExplorerComponent);
  }

  private setupSpecEnhancerComponent() {
    this.component(SpecEnhancerComponent);
  }

  private setupLoggingComponent() {
    this.configure<LoggingComponentConfig>(LoggingBindings.COMPONENT).to({
      options: {
        path: process.env.LOG_PATH ?? path.join(__dirname, '../../logs'),
        level: process.env.LOG_LEVEL ?? LOGGER_LEVEL.INFO,
        stack_trace: process.env.NODE_ENV === NodeENV.DEVELOPMENT
      },
      invoke: [InvokeFactory.createConsole],
      default: [DefaultFactory.createConsole],
    });
    this.component(LoggingComponent);
  }

  private setupJWTComponent() {
    this.configure<JWTComponentConfig>(JWTBindings.COMPONENT)
      .to({
        secret: process.env.JWT_SECRET ?? 'MY_SECRET',
        expiresIn: process.env.AUTH_ACCESS_EXPIRES ?? '14 days',
      });
    this.component(AuthenticationComponent);

    this.component(JWTComponent);
  }

  private setupAuthorizationComponent() {
    this.configure<AuthorizationOptions>(AuthorizationBindings.COMPONENT)
      .to({
        defaultDecision: AuthorizationDecision.DENY,
        precedence: AuthorizationDecision.DENY
      });
    this.component(AuthorizationComponent);
    this.component(AuthorizationPolicyComponent);
  }

  private setupWebsocketsComponent() {
    // Create ws server
    this.wsServer = new WebSocketServer(this);
    this.bind('servers.websocket.server1').to(this.wsServer);

    this.wsServer.use((socket, next) => {
      this.log('Global middleware - socket:', socket.id);
      next();
    });

    // Add a ws route to WarEntityPreviewController
    const ns = this.wsServer.route(WarEntityPreviewController, /^\/WarEntityPreview/);
    ns.use((socket, next) => {
      this.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });

    // Add a ws route to ImportTableController
    const ns2 = this.wsServer.route(ImportTableController, /^\/ImportTable/);
    ns2.use((socket, next) => {
      this.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    })

    // Add a ws route to SystemStatusController
    this.wsServer.route(SysStatusController, /^\/SysStatus/)
      .use((socket, next) => {
        this.log(
          'Middleware for namespace %s - socket: %s',
          socket.nsp.name,
          socket.id,
        );
        next();
      });

    // Add a ws route to FieldChangeController
    this.wsServer.route(FieldChangeController, /^\/FieldChange/)
      .use((socket, next) => {
        this.log(
          'Middleware for namespace %s - socket: %s',
          socket.nsp.name,
          socket.id,
        );
        next();
      });


    // Create the Postgres Notification Manager
    this.pgNotifManager = new PostgresNotificationsManager(this);

  }

  /**
    * Setup static files to serve default homepage
    *
    * this.static is called if no other route was found by
    * GvSequence.findRoute() (i.e. no api endpoint, no component as /explorer)
    * Read more: https://github.com/strongloop/loopback-next/issues/1785
    *
    * The best solution would be to just serve the static files for every
    * requested path not matched by an api endpoint or the explorer.
    * Currently, this is not possible, because a RegEx on the base path '/'
    * causes Express to mess up content-type header for returned files.
    *
    * For this reason we need a workaround: add this.static for each
    * top level path that is potentially called by the angular client
    * defined in /geovistory/client/src/app/app-routing.module.ts
    */
  private registerStaticFiles() {

    this.static('/', path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static('/home', path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/projects.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/admin.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/backoffice.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/email-verified.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/reset-password.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
    this.static(/\/login.*/, path.join(__dirname, '../../client/dist/app-toolbox'));
  }


  private log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.log(msg, ...params)
  }
}



