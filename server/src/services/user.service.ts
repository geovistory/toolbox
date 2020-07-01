import { MyUserService, User, } from '@loopback/authentication-jwt';
import { HttpErrors } from '@loopback/rest';
import * as crypto from 'crypto';


export class UserService extends MyUserService {

  /**
   * Checks if email has been verified. Throws http error if not.
   */
  emailVerified(user: User) {
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

}




