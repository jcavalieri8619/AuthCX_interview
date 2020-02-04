import {IUserMessage} from './user-message';

export interface IUserMessagesByKey {
  key: string;
  messages: IUserMessage[];
}
