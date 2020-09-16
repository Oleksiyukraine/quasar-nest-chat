// Other
import { IsString } from 'class-validator';

export default class MessagesDto {
  @IsString()
  from: object;

  @IsString()
  room: object;

  @IsString()
  text: string;
}
