import { Client } from '../client/client';
import { Channel } from './channel';
import { Guild } from './guild';
import { User } from './user';

export interface MessageEmbed {
  description: string;
  image: string;
  title: string;
  url: string;
}

export class Message {
  /** Snowflake ID of the message. */
  id: string;
  /** User that created the message. */
  author: User;
  /** Text channel that the message was created in. */
  channel: Channel;
  /** Text content of the message. */
  content: string;
  /** When the message was created at. */
  createdAt: Date;
  /** The embed provided with the message. */
  embed: MessageEmbed;
  /** The guild was the message was in. */
  guild?: Guild;
  /** When the message was last updated at. */
  updatedAt: Date;

  constructor(message: any, private client: Client) {    
    this.id = message._id;
    this.author = new User(message.author);
    this.channel = new Channel(message.channel);
    this.content = message.content;
    this.createdAt = message.createdAt;
    this.embed = message.embed;
    this.guild = message.guild;
    this.updatedAt = message.updatedAt;  
  }

  /** Reply as a bot user to a message, in the same channel. */
  async reply(content: string) {
    this.client.ws.sendMessage(content, this.channel);
  }
}
