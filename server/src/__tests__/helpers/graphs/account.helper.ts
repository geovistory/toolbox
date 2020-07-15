import * as AtmAccount from '../atomic/pub-account.helper';
import * as AtmCredential from '../atomic/pub-credential.helper';

export async function createAccountVerified(email: string, username: string, password: string) {
    const account = await AtmAccount.createVerified(email, username);
    await AtmCredential.create(account.id, password);
}   