import { sandboxOf } from 'angular-playground';
import { AppRoutingModule } from '../../../../../app/app-routing.module';
import { ActiveAccountService } from '../../../../../app/core/active-account';
import { AuthModule } from '../../../../../app/core/auth/auth.module';
import { GvAuthService } from '../../../../../app/core/auth/auth.service';
import { LoadingBarModule } from '../../../../../app/shared/components/loading-bar/loading-bar.module';
import { AccountModule } from '../../account.module';
import { LoginComponent } from './login.component';


/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(LoginComponent, {
  declareComponent: false,
  imports: [
    AccountModule,
    AuthModule,
    LoadingBarModule,
    AppRoutingModule
  ],
  providers: [
    GvAuthService,
    ActiveAccountService,
  ]
})
  .add('Login', {
    context: {},
    template: `

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-login></gv-login>
            </div>
        </div>`
  })