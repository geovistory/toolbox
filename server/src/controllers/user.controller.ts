import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {JsonSchemaWithExtensions, Model, model, property, repository} from '@loopback/repository';
import {get, HttpErrors, oas, param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcrypt';
import _ from 'lodash';
import {JWTService} from '../components/jwt';
import {JWTBindings} from '../components/jwt/keys';
import {PubAccount} from '../models';
import {PubAccountRepository} from '../repositories';
import {EmailService} from '../services/email.service';
import {PasswordResetTokenService} from '../services/password-reset-token.service';
import {UserService} from '../services/user.service';


// the requirements for new passwords can be higher
const NewPasswordSchema: JsonSchemaWithExtensions = {
  type: 'string',
  minLength: 8,
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
export class ResetPasswordRequest {
  @property({required: true, jsonSchema: NewPasswordSchema}) password: string
  @property({required: true}) resetPasswordToken: string
}

@model()
class VerifyEmailRequest {
  @property({required: true}) userId: string
  @property({required: true}) verificationToken: string
  @property({required: true, jsonSchema: UrlSchema}) redirectOnSuccess: string
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

export class UserController {
  constructor(
    @inject(JWTBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject('APP_USER_SERVICE') public userService: UserService,
    @inject('APP_EMAIL_SERVICE') protected emailService: EmailService,
    @inject('APP_PASSWORD_RESET_TOKEN_SERVICE') protected passwordResetTokenService: PasswordResetTokenService,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
    @repository(PubAccountRepository) protected userRepository: PubAccountRepository,
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
    const user = await this.userService.verifyCredentials(credentials);

    // ensure the email has been verified
    this.userService.emailVerified(user)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const lb4 = await this.jwtService.generateTokenWithExpire(userProfile);

    // login the old loopback 3 way
    const lb3 = await lb3PubAccount.login(credentials)

    const pubAccount = user.toJSON() as PubAccount
    return {
      user: pubAccount,

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
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': PubAccount,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody() newUserRequest: SignupRequest,
  ): Promise<PubAccount> {
    const password = await hash(newUserRequest.password, await genSalt());

    const verificationToken = await this.userService.generateVerificationToken()

    const savedUser = await this.userRepository.create(
      {
        emailVerified: false,
        verificationToken,
        ..._.omit(newUserRequest, 'password'),
        // TODO: exclude credentials in other table
        password
      },
    );
    // TODO: exclude credentials in other table
    // await this.userRepository.userCredentials(savedUser.id).create({password});

    // send email verification email with email verification token
    if (!savedUser.verificationToken) {
      throw new HttpErrors.InternalServerError()
    }
    await this.emailService.sendEmailVerificationEmail(savedUser.id, savedUser.email, savedUser.verificationToken)

    return new PubAccount({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      emailVerified: savedUser.emailVerified
    });
  }

  @post('/verify-email', {
    description: 'Verifies email address. Usually needed to complete registration of new account.',
    responses: {
      '400': {
        description: 'Validation Failed',
      },
      '404': {
        description: 'User not found',
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
    @requestBody() req: VerifyEmailRequest,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<void> {

    const user = await this.userRepository.findById(req.userId)

    if (user && user.verificationToken === req.verificationToken) {
      user.verificationToken = undefined;
      user.emailVerified = true;
      await this.userRepository.update(user)

      response.redirect(req.redirectOnSuccess);

      return;
    }


    if (user) {
      throw new HttpErrors.Unauthorized(`Invalid token: ${req.verificationToken}`)
    } else {
      throw new HttpErrors.NotFound(`User not found: ${req.userId}`)
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

    const user = await this.userRepository.findOne({
      where: {
        email: {eq: email}
      }
    })
    if (!user) {
      throw new HttpErrors.NotFound(`Email '${email}' not found`)
    }
    this.userService.emailVerified(user)

    const userProfile = this.userService.convertToUserProfile(user)

    const passwordResetToken = await this.passwordResetTokenService.generateToken(userProfile)

    await this.emailService.sendResetPaswortEmail(user.email, passwordResetToken)

    return {message: `Email to reset password has been sent to ${user.email}`}
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

    const user = await this.userRepository.findById(userProfile.userId);

    if (!user) throw new HttpErrors.Unauthorized(`User with id ${userProfile.userId} not found.`)

    const password = await hash(resetPasswordRequest.password, await genSalt());

    // TODO: exclude credentials in other table
    // await this.userRepository.userCredentials(user.id).patch({password});
    await this.userRepository.updateById(user.id, {password});

    return {message: 'Password reset successful'};
  }

}
