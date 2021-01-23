import { io } from 'socket.io-client';
import { env } from '../env';
import Deps from '../utils/deps';
import { Client } from './client';

const client = Deps.get<Client>(Client);

export class WSClient {
  public readonly socket = io(env.url);

  async ready() {
    const channelIds: string[] = channels.map(d => d.id);
    const guildIds: string[] = [];

    const botMembers = await GuildMember.find({ user: this.self.id });
    for (const member of botMembers) {
      const guild = await Guild.findById(member.guildId);
      guildIds.push(guild.id);

      for (const channel of guild.channels)
        channelIds.push(channel as any);
    }

    this.socket.emit('READY', {
      channelIds: Array
        .from(client.guilds.values())
        .flatMap(g => g.channels.map(c => c._id))
        .concat(this.channelService.dmChannels.map(c => c._id)),
      guildIds: Array.from(client.guilds.keys()),
      user: client.user
    });

    Log.info('Initialized bot', 'bot');
  }
}
