import {authenticate, TokenService} from '@loopback/authentication';
import {Credentials, TokenServiceBindings, User, UserRepository} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {Model, model, property, repository} from '@loopback/repository';
import {get, HttpErrors, oas, param, post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {EmailService} from '../services/email.service';
import {PasswordResetTokenService} from '../services/password-reset-token.service';
import {UserService} from '../services/user.service';


export interface NewUserRequest extends Credentials {
  username: string;
}

const PasswordSchema = {
  type: 'string',
  minLength: 8,
}
const EmailSchema = {
  type: 'string',
  format: 'email',
}
const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: EmailSchema,
    password: PasswordSchema,
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

const NewUserSchema = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: EmailSchema,
    username: {
      type: 'string',
      maxLength: 15,
    },
    password: PasswordSchema,
  },
};
export const SignupRequestBody = {
  description: 'The input of signup function',
  required: true,
  content: {
    'application/json': {schema: NewUserSchema},
  },
}

interface ResetPasswordRequest {
  password: string
  resetPasswordToken: string
}

const ResetPasswordRequestSchema = {
  type: 'object',
  required: ['password', 'resetPasswordToken'],
  properties: {
    password: PasswordSchema,
    resetPasswordToken: {
      type: 'string'
    }
  },
};

export const ResetPasswordRequestBody = {
  description: 'The input of resetPassword function',
  required: true,
  content: {
    'application/json': {schema: ResetPasswordRequestSchema},
  },
}


interface VerifyEmailRequest {
  userId: string,
  verificationToken: string,
  redirectOnSuccess: string
}
const VerifyEmailSchema = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    userId: {
      type: 'string',
    },
    verificationToken: {
      type: 'string'
    },
    redirectOnSuccess: {
      type: 'string',
      format: 'url',
    },
  },
};
export const VerifyEmailRequestBody = {
  description: 'The input of verify email function',
  required: true,
  content: {
    'application/json': {schema: VerifyEmailSchema},
  },
}


@model()
class ResponseWithMsg {
  @property()
  message: string;
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
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject('APP_USER_SERVICE') public userService: UserService,
    @inject('APP_EMAIL_SERVICE') protected emailService: EmailService,
    @inject('APP_PASSWORD_RESET_TOKEN_SERVICE') protected passwordResetTokenService: PasswordResetTokenService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}


  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // ensure the email has been verified
    this.userService.emailVerified(user)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
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
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody(SignupRequestBody)
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());

    const verificationToken = await this.userService.generateVerificationToken()

    const savedUser = await this.userRepository.create(
      {
        emailVerified: false,
        verificationToken,
        ..._.omit(newUserRequest, 'password')
      },
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});

    // send email verification email with email verification token
    if (!savedUser.verificationToken) {
      throw new HttpErrors.InternalServerError()
    }
    await this.emailService.sendEmailVerificationEmail(savedUser.id, savedUser.email, savedUser.verificationToken)

    return new User({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      emailVerified: savedUser.emailVerified
    });
  }

  @get('/verify-email', {
    responses: {
      '400': {
        description: 'Validation Failed',
      },
      '404': {
        description: 'User not found',
      },
      '302': {
        description: 'Validation Succeeded',
        headers: {
          redirect: {
            schema:{
              type: 'string'
            }
          }
        }
      },
    },
  })
  async verifyEmail(
    @param.query.string('userId') userId: string,
    @param.query.string('verificationToken') verificationToken: string,
    @param.query.string('redirectOnSuccess') redirectOnSuccess: string,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<void> {

    const user = await this.userRepository.findById(userId)

    if (user && user.verificationToken === verificationToken) {
      user.verificationToken = undefined;
      user.emailVerified = true;
      await this.userRepository.update(user)

      response.redirect(redirectOnSuccess);

      return;
    }


    if (user) {
      throw new HttpErrors.Unauthorized(`Invalid token: ${verificationToken}`)
    } else {
      throw new HttpErrors.NotFound(`User not found: ${userId}`)
    }

  }



  @get('/reset-password-request')
  @oas.response(200, ResponseWithMsg)
  @oas.response(404, HttpErrorModel)
  async resetPasswordReset(
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



  @post('/reset-password')
  @oas.response(200, ResponseWithMsg)
  @oas.response(401, HttpErrorModel)
  async resetPassword(
    @requestBody(ResetPasswordRequestBody) resetPasswordRequest: ResetPasswordRequest
  ): Promise<ResponseWithMsg> {

    if (!resetPasswordRequest.resetPasswordToken) {
      throw new HttpErrors.Unauthorized(`Please provide password reset token`);
    }
    const userProfile = await this.passwordResetTokenService.verifyToken(resetPasswordRequest.resetPasswordToken)

    const user = await this.userRepository.findById(userProfile.userId);

    if (!user) throw new HttpErrors.Unauthorized(`User with id ${userProfile.userId} not found.`)

    const password = await hash(resetPasswordRequest.password, await genSalt());

    await this.userRepository.userCredentials(user.id).patch({password});

    return {message: 'Password reset successful'};
  }

}
