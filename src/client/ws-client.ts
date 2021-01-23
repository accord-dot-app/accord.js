import io from 'socket.io-client';
import { env } from '../env';
import { Channel } from '../structures/channel';
import { Message } from '../structures/message';
import { Client } from './client';

export class WSClient {
  public readonly socket = io(env.url);

  constructor(private client: Client) {
    this.socket.on('connect', () => console.log('Connected to ws client'));
    this.socket.connect();
  }

  public async ready() {    
    this.socket.emit('READY', {
      channelIds: Array.from(this.client.channels.keys()),
      guildIds: Array.from(this.client.guilds.keys()),
      user: this.client.user
    });

    this.hookEvents();

    this.client.emitter.emit('ready');
  }

  private hookEvents() {    
    this.socket.on('MESSAGE_CREATE', async (message: any) => {
      message = new Message(message, this.client);      
      if (message.author.id === this.client.user.id) return;
      
      this.client.emitter.emit('message', message);
    });
  }

  public sendMessage(content: string, channel: Channel) {
    this.socket.emit('MESSAGE_CREATE', {
      author: this,
      channel,
      content
    });
  }
}
