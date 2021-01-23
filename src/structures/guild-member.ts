import { User } from './user';

export class GuildMember {
  /** Snowflake ID of the guild. */
  guildId: string;
  /** Snowflake IDs of the roles the member has. */
  roleIds: string[];
  /** The user of the guild member. */
  user: User;

  constructor(member: any) {
    this.guildId = member.guildId;
    this.roleIds = member.roleIds;
    this.user = new User(member.user);
  }
}
