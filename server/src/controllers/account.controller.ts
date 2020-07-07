import { authenticate, TokenService } from '@loopback/authentication';
import { Credentials, TokenServiceBindings } from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { Model, model, property, repository } from '@loopback/repository';
import { get, HttpErrors, oas, param, post, Request, requestBody, Response, RestBindings } from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { EmailService } from '../services/email.service';
import { PasswordResetTokenService } from '../services/password-reset-token.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';
import { AccountRepository } from '../repositories/account.repository';


export interface NewAccountRequest extends Credentials {
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
    'application/json': { schema: CredentialsSchema },
  },
};

const NewAccountSchema = {
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
    'application/json': { schema: NewAccountSchema },
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
    'application/json': { schema: ResetPasswordRequestSchema },
  },
}


interface VerifyEmailRequest {
  accountId: string,
  verificationToken: string,
  redirectOnSuccess: string
}
const VerifyEmailSchema = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    accountId: {
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
    'application/json': { schema: VerifyEmailSchema },
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





export class AccountController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject('APP_ACCOUNT_SERVICE') public accountService: AccountService,
    @inject('APP_EMAIL_SERVICE') protected emailService: EmailService,
    @inject('APP_PASSWORD_RESET_TOKEN_SERVICE') protected passwordResetTokenService: PasswordResetTokenService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }


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
  ): Promise<{ token: string }> {
    // ensure the account exists, and the password is correct
    const account = await this.accountService.verifyCredentials(credentials);

    // ensure the email has been verified
    this.accountService.emailVerified(account)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.accountService.convertToUserProfile(account);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: '',
        schema: {
          type: 'string',
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
        description: 'Account',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Account,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody(SignupRequestBody)
    newAccountRequest: NewAccountRequest,
  ): Promise<Account> {

    ///temp

      console.log(await this.accountRepository.dataSource.execute('SELECT * FROM public.account LIMIT 10;'));

    ///temp


    const password = await hash(newAccountRequest.password, await genSalt());

    const verificationToken = await this.accountService.generateVerificationToken()

    const savedAccount = await this.accountRepository.create(
      {
        emailVerified: false,
        verificationToken,
        ..._.omit(newAccountRequest, 'password')
      },
    );

    await this.accountRepository.accountCredentials(savedAccount.id).create({ password });

    // send email verification email with email verification token
    if (!savedAccount.verificationToken) {
      throw new HttpErrors.InternalServerError()
    }
    await this.emailService.sendEmailVerificationEmail(savedAccount.id, savedAccount.email, savedAccount.verificationToken)

    return new Account({
      id: savedAccount.id,
      username: savedAccount.username,
      email: savedAccount.email,
      emailVerified: savedAccount.emailVerified
    });
  }

  @get('/verify-email', {
    responses: {
      '400': {
        description: 'Validation Failed',
      },
      '404': {
        description: 'Account not found',
      },
      '302': {
        description: 'Validation Succeeded',
        headers: {
          redirect: {
            type: 'string'
          }
        }
      },
    },
  })
  async verifyEmail(
    @param.query.string('accountId') accountId: number,
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
      throw new HttpErrors.NotFound(`User not found: ${accountId}`)
    }

  }



  @get('/reset-password-request')
  @oas.response(200, ResponseWithMsg)
  @oas.response(404, HttpErrorModel)
  async resetPasswordReset(
    @param.query.string('email', { required: true }) email: string
  ): Promise<ResponseWithMsg> {

    const account = await this.accountRepository.findOne({
      where: {
        email: { eq: email }
      }
    })
    if (!account) {
      throw new HttpErrors.NotFound(`Email '${email}' not found`)
    }
    this.accountService.emailVerified(account)

    const userProfile = this.accountService.convertToUserProfile(account)

    const passwordResetToken = await this.passwordResetTokenService.generateToken(userProfile)

    await this.emailService.sendResetPaswortEmail(account.email, passwordResetToken)

    return { message: `Email to reset password has been sent to ${account.email}` }
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

    const account = await this.accountRepository.findById(userProfile.userId);

    if (!account) throw new HttpErrors.Unauthorized(`User with id ${userProfile.userId} not found.`)

    const password = await hash(resetPasswordRequest.password, await genSalt());

    await this.accountRepository.accountCredentials(account.id).patch({ password });

    return { message: 'Password reset successful' };
  }

}
