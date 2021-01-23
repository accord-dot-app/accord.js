import { Channel } from './channel';
import { GuildMember } from './guild-member';
import { Role } from './role';
import { User } from './user';

export class Guild {
  /** Snowflake ID of the guild. */
  id: string;
  /** Name of the guild. */
  name: string;
  /** When the guild was created at. */
  createdAt: Date;
  /** Name acronym of the guild (e.g. Project 2D -> P2). */
  nameAcronym: string;
  /** Icon URL of the guild. */
  iconURL: string;
  /** User that owns the guild. */
  owner: User;
  /** Channels that are in the guild. */
  channels: Channel[];
  /** Guild members that are in the guild. */
  members: GuildMember[];
  /** Roles that are in the guild. */
  roles: Role[];

  constructor(guild: any) {
    this.id = guild._id;
    this.name = guild.name;
    this.createdAt = guild.createdAt; 
    this.nameAcronym = guild.nameAcronym;
    this.iconURL = guild.iconURL;
    this.owner = new User(guild);

    const channels = [];
    for (const channel of guild.channels)
      channels.push(new Channel(channel));

    const members = [];
    for (const member of guild.members)
      members.push(new GuildMember(member));
  }
}
