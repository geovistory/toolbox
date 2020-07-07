import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcrypt';
import * as crypto from 'crypto';
import {PubAccount} from '../models';
import {PubAccountRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

export class UserService {
  constructor(
    @repository(PubAccountRepository) public userRepository: PubAccountRepository,
  ) {}

  /**
   * Checks if email has been verified. Throws http error if not.
   */
  emailVerified(user: PubAccount) {
    const emailNotVerifiedError = 'Email not yet verified.';

    if (!user.emailVerified) {
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



  async verifyCredentials(credentials: Credentials): Promise<PubAccount> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findById(
      foundUser.id,
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

    return foundUser;
  }

  convertToUserProfile(user: PubAccount): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}




