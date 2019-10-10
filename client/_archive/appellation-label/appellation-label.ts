
import { Token } from '../appellation-token/appellation-token';

export interface AppellationLabelInterface {
  'latestTokenId': number, // the id of the latest created token. increments by 1, starting by 0.
  'tokens': Token[] // Array of Tokens
}

export interface UpdateTokenStringRequest {
  newString: string;
  index: number;
}

export interface UpdateTokenIsSeparatorRequest {
  newIsSeparator: boolean;
  index: number;
}

export interface InsertTokenRequest {
  oldToken: Token;
  newToken: Token;
  index: number; // where the new token should be inserted
}
