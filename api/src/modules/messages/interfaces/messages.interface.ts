import { Document } from 'mongoose';

export interface IMessage extends Document {
  readonly from: object;
  readonly room: object;
  readonly text: string;
}
