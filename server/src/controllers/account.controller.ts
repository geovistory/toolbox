import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {JsonSchemaWithExtensions, Model, model, property, repository} from '@loopback/repository';
import {get, HttpErrors, oas, param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {hash, genSalt} from 'bcrypt';
import _ from 'lodash';
import {JWTService} from '../components/jwt';
import {JWTBindings} from '../components/jwt/keys';
import {PubAccount} from '../models/pub-account.model';
import {PubAccountRepository} from '../repositories/pub-account.repository';
import {AccountService} from '../services/account.service';
import {EmailService} from '../services/email.service';
import {PasswordResetTokenService} from '../services/password-reset-token.service';
import {Postgres1DataSource} from '../datasources';


// the requirements for new passwords can be higher
const NewPasswordSchema: JsonSchemaWithExtensions = {
  type: 'string',
  minLength: 8,
  maxLength: 20,
  pattern: /(?=.*[\d])(?=.*[A-Za-z]).*/.source
}
const EmailSchema: JsonSchemaWithExtensions = {
  type: 'string',
  format: 'email',
}
const UrlSchema: JsonSchemaWithExtensions = {
  type: 'string',
  format: 'url',
}



@model()
export class LoginRequest {
  @property({required: true}) email: string;
  @property({required: true}) password: string;
}

@model()
export class LoginResponse {
  @property() user: PubAccount;
  @property() lb4Token: string;
  @property() lb4ExpiresInMs: number;
  @property() lb3Token: string;
  @property() lb3Ttl: number;
  @property() lb3Created: string;
}

@model()
export class SignupRequest {
  @property({required: true, jsonSchema: EmailSchema}) email: string;
  @property({required: true}) username: string;
  @property({required: true, jsonSchema: NewPasswordSchema}) password: string;
}

@model()
export class SignupValidationError {
  @property() email?: string;
  @property() username?: string;
}

@model()
export class SignupResponse {
  @property() success?: PubAccount;
  @property() validationError?: SignupValidationError
}

@model()
export class ResetPasswordRequest {
  @property({required: true, jsonSchema: NewPasswordSchema}) password: string
  @property({required: true}) resetPasswordToken: string
}



@model()
export class ResponseWithMsg {
  @property() message: string;
}

@model()
export class HttpErrorObjectModel extends Model {
  @property() statusCode: number
  @property() name: string
  @property() message: string
}

@model()
export class HttpErrorModel extends Model {
  @property() error: HttpErrorObjectModel
}

export class AccountController {
  constructor(
    @inject(JWTBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject('APP_ACCOUNT_SERVICE') public accountService: AccountService,
    @inject('APP_EMAIL_SERVICE') protected emailService: EmailService,
    @inject('APP_PASSWORD_RESET_TOKEN_SERVICE') protected passwordResetTokenService: PasswordResetTokenService,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
    @repository(PubAccountRepository) protected accountRepository: PubAccountRepository,
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
  ) {}


  @post('/login', {
    description: 'Login with existing account',
    responses: {
      '200': {
        description: 'Login succeeded and token(s) returned',
        content: {'application/json': {schema: {'x-ts-type': LoginResponse}}},
      },
    },
  })
  async login(
    @requestBody() credentials: LoginRequest,
    @inject('lb3-models.PubAccount') lb3PubAccount: {
      login: (credentials: LoginRequest) => Promise<{
        id: string,
        ttl: number,
        created: string,
        userId: number
      }>
    }
  ): Promise<LoginResponse> {

    // ensure the user exists, and the password is correct
    const account = await this.accountService.verifyCredentials(credentials);

    // ensure the email has been verified
    this.accountService.emailVerified(account)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.accountService.convertToUserProfile(account);

    // create a JSON Web Token based on the user profile
    const lb4 = await this.jwtService.generateTokenWithExpire(userProfile);

    // login the old loopback 3 way
    const lb3 = await lb3PubAccount.login(credentials)

    const account2 = account.toJSON() as PubAccount
    return {
      user: account2,

      lb4Token: lb4.token,
      lb4ExpiresInMs: lb4.expiresInMs,

      lb3Token: lb3.id,
      lb3Ttl: lb3.ttl,
      lb3Created: lb3.created,
    };
  }

  @authenticate('basic')
  // authorize projectMember
  // authorize systemAdmin
  @get('/whoAmI', {
    description: 'Decodes the given token and returns the user id.',
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  async whoAmI(
    // @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<string> {
    return this.user[securityId];
  }

  @post('/signup', {
    description: 'Sign up / register new account',
    responses: {
      '200': {
        description: 'Account',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': SignupResponse,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody() newAccountRequest: SignupRequest,
  ): Promise<SignupResponse> {

    const password = await hash(newAccountRequest.password, await genSalt());

    const verificationToken = await this.accountService.generateVerificationToken()

    const validationError = await this.accountService.validateUniqueness(newAccountRequest.email, newAccountRequest.username);

    if (Object.keys(validationError).length) return {validationError};

    const savedAccount = await this.accountRepository.create(
      {
        emailVerified: false,
        verificationToken,
        ..._.omit(newAccountRequest, 'password')
      },
    );
    await this.accountRepository.pubAccountCredentials(savedAccount.id).create({password});

    // send email verification email with email verification token
    if (!savedAccount.verificationToken) {
      throw new HttpErrors.InternalServerError()
    }
    await this.emailService.sendEmailVerificationEmail(savedAccount.id, savedAccount.email, savedAccount.verificationToken)

    // create sandbox project for the new account
    const sql = 'SELECT commons.clone_sandbox_project($1);';
    const params = [savedAccount.id];
    await this.dataSource.execute(sql, params);


    return {
      success: new PubAccount({
        id: savedAccount.id,
        username: savedAccount.username,
        email: savedAccount.email,
        emailVerified: savedAccount.emailVerified
      })
    };
  }



  @get('/verify-email', {
    description: 'Verifies email address. Usually needed to complete registration of new account.',
    responses: {
      '400': {
        description: 'Validation Failed',
      },
      '404': {
        description: 'Account not found',
      },
      '302': {
        description: 'On Success, redirects browser to url given by redirectOnSuccess property of VerifyEmailRequest',
        headers: {
          redirect: {
            description: 'Url for browser redirect',
            schema: {
              type: 'string'
            }
          }
        }
      },
    },
  })
  async verifyEmail(
    @param.query.number('accountId') accountId: number,
    @param.query.string('verificationToken') verificationToken: string,
    @param.query.string('redirectOnSuccess') redirectOnSuccess: string,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<void> {

    const account = await this.accountRepository.findById(accountId)

    if (account && account.verificationToken === verificationToken) {
      account.verificationToken = undefined;
      account.emailVerified = true;
      await this.accountRepository.update(account)

      response.redirect(redirectOnSuccess);

      return;
    }

    if (account) {
      throw new HttpErrors.Unauthorized(`Invalid token: ${verificationToken}`)
    } else {
      throw new HttpErrors.NotFound(`Account not found: ${accountId}`)
    }

  }



  @get('/forgot-password', {
    description: 'Sends a email to the given email address with a link to reset the password.',
    responses: {
      '200': {
        description: 'Confirmation message',
        content: {'application/json': {schema: {'x-ts-type': ResponseWithMsg}}},
      },
    },
  })
  @oas.response(404, HttpErrorModel)
  async forgotPassword(
    @param.query.string('email', {required: true}) email: string
  ): Promise<ResponseWithMsg> {

    const account = await this.accountRepository.findOne({
      where: {
        email: {eq: email}
      }
    })
    if (!account) {
      throw new HttpErrors.NotFound(`Email '${email}' not found`)
    }
    this.accountService.emailVerified(account)

    const userProfile = this.accountService.convertToUserProfile(account)

    const passwordResetToken = await this.passwordResetTokenService.generateToken(userProfile)

    await this.emailService.sendResetPaswortEmail(account.email, passwordResetToken)

    return {message: `Email to reset password has been sent to ${account.email}`}
  };



  @post('/reset-password',
    {
      description: 'Resets the password. UserId of the user in question is encoded in the resetPasswordToken. Method validates resetPasswordToken and the new password.',
      responses: {
        '200': {
          description: 'Confirmation message',
          content: {'application/json': {schema: {'x-ts-type': ResponseWithMsg}}},
        },
      },
    })
  @oas.response(401, HttpErrorModel)
  async resetPassword(
    @requestBody() resetPasswordRequest: ResetPasswordRequest
  ): Promise<ResponseWithMsg> {

    if (!resetPasswordRequest.resetPasswordToken) {
      throw new HttpErrors.Unauthorized(`Please provide password reset token`);
    }
    const userProfile = await this.passwordResetTokenService.verifyToken(resetPasswordRequest.resetPasswordToken)

    const accountId = parseInt(userProfile[securityId])

    const account = await this.accountRepository.findById(accountId);

    if (!account) throw new HttpErrors.Unauthorized(`User with id ${accountId} not found.`)

    const password = await hash(resetPasswordRequest.password, await genSalt());

    await this.accountRepository.pubAccountCredentials(account.id).patch({password});

    return {message: 'Password reset successful'};
  }

}
