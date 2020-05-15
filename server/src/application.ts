import {BootMixin} from '@loopback/boot';
import {Lb3AppBooterComponent} from '@loopback/booter-lb3app';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {log} from './middleware/log.middleware';
import {GvSequence} from './sequence';

export class GeovistoryApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // this.middleware(serveIndex)

    // Set up the custom sequence
    this.sequence(GvSequence);

    this.middleware(log)

    /**
     * Setup default homepage
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
    this.static('/', path.join(__dirname, '../../client/dist'));
    this.static('/home', path.join(__dirname, '../../client/dist'));
    this.static(/\/projects.*/, path.join(__dirname, '../../client/dist'));
    this.static(/\/admin.*/, path.join(__dirname, '../../client/dist'));
    this.static(/\/backoffice.*/, path.join(__dirname, '../../client/dist'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Register Loopback 3 app as a component
    // TODO:
    // - Migrate Lb3 to Lb4 and remove the following line
    // - run: npm uninstall --save @loopback/booter-lb3app
    this.component(Lb3AppBooterComponent);

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
  }
}
