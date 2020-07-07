import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {AuthorizationBindings, AuthorizationComponent, AuthorizationDecision, AuthorizationOptions} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {Lb3AppBooterComponent} from '@loopback/booter-lb3app';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {AuthorizationPolicyComponent} from './components/authorization';
import {JWTBindings, JWTComponent, JWTComponentConfig} from './components/jwt';
import {DefaultFactory, InvokeFactory, LOGGER_LEVEL, LoggingBindings, LoggingComponent, LoggingComponentConfig} from './components/logger';
import {Postgres1DataSource} from './datasources/postgres1.datasource';
import {log} from './middleware/log.middleware';
import {Streams} from './realtime/streams/streams';
import {GvSequence} from './sequence';
import {EmailService} from './services/email.service';
import {PasswordResetTokenService} from './services/password-reset-token.service';
import {UserService} from './services/user.service';
import {NodeENV} from './utils/code.utils';
import {BasicAuthenticationStrategy} from './strategies/basic-strategy';


export class GeovistoryApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {

  streams = new Streams()

  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.bind('APP_EMAIL_SERVICE').toClass(EmailService)
    this.bind('APP_USER_SERVICE').toClass(UserService)
    this.bind('APP_PASSWORD_RESET_TOKEN_SERVICE').toClass(PasswordResetTokenService)

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
      },

      // Added for mounting Lb3 in Lb4 setup
      // https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
      lb3app: {
        mode: 'fullApp'
      }
    };

    this.setupComponents()

    registerAuthenticationStrategy(this, BasicAuthenticationStrategy);


    // Bind datasource
    this.dataSource(Postgres1DataSource, 'datasources.postgres1');

  }


  private setupComponents() {
    this.setupRestExplorerComponent();
    this.setupLoopback3Component();
    // this.setupLoggingComponent();
    this.setupJWTComponent();
    this.setupAuthorizationComponent();
  }

  // Register Loopback 3 app as a component
  private setupRestExplorerComponent() {
    // TODO:
    // - Migrate Lb3 to Lb4 and remove the following line
    // - run: npm uninstall --save @loopback/booter-lb3app
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
  }

  private setupLoopback3Component() {
    this.component(Lb3AppBooterComponent);
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
        expiresIn: {
          AUTH_ACCESS: process.env.AUTH_ACCESS_EXPIRES ?? '14 days',
          AUTH_REFRESH: process.env.AUTH_REFRESH_EXPIRES ?? '90 days'
        }
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
    this.component<AuthorizationComponent>(AuthorizationComponent);
    this.component(AuthorizationPolicyComponent);
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

    this.static('/', path.join(__dirname, '../../client/dist'));
    this.static('/home', path.join(__dirname, '../../client/dist'));
    this.static(/\/projects.*/, path.join(__dirname, '../../client/dist'));
    this.static(/\/admin.*/, path.join(__dirname, '../../client/dist'));
    this.static(/\/backoffice.*/, path.join(__dirname, '../../client/dist'));
  }

}


