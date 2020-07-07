// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
import { Account } from '../models/account.model';
import { AccountRepository } from '../repositories/account.repository';
import * as crypto from 'crypto';

/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  email: string;
  password: string;
};

export class AccountService implements UserService<Account, Credentials> {
  constructor(
    @repository(AccountRepository) public accountRepository: AccountRepository,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Account> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundAccount = await this.accountRepository.findOne({
      where: { email: credentials.email },
    });
    if (!foundAccount) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.accountRepository.findCredentials(
      foundAccount.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundAccount;
  }

  convertToUserProfile(account: Account): UserProfile {
    return {
      [securityId]: account.id.toString(),
      name: account.username,
      id: account.id,
      email: account.email,
    };
  }


  /**
   * Checks if email has been verified. Throws http error if not.
   */
  emailVerified(account: Account) {
    const emailNotVerifiedError = 'Email not yet verified.';

    if (!account.emailVerified) {
      throw new HttpErrors.Unauthorized(emailNotVerifiedError);
    }

  }

  /**
 * A default verification token generator which accepts the user the token is
 * being generated for and a callback function to indicate completion.
 * This one uses the crypto library and 64 random bytes (converted to hex)
 * for the token. When used in combination with the user.verify() method this
 * function will be called with the `user` object as it's context (`this`).
 *
 * @param {object} user The User this token is being generated for.
 * @param {object} options remote context options.
 * @param {Function} cb The generator must pass back the new token with this function call.
 */
  async generateVerificationToken(): Promise<string> {
    return new Promise((res, rej) => {
      crypto.randomBytes(64, function (err, buf) {
        if (err) {
          rej(err)
          throw new HttpErrors.InternalServerError('Error while creating new account.');
        }
        else res(buf?.toString('hex'))
      });
    })
  };

}