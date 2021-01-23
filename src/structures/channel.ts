export type ChannelType = 'DM' | 'TEXT' | 'VOICE';

export class Channel {
  /** Snowflake ID of the channel. */
  id: string;
  /** The time when the channel was created. */
  createdAt: Date;
  /** The name of the channel. */
  name?: string;
  /** The type of the channel (e.g, 'TEXT'). */
  type: ChannelType;
  /** The snowflake ID of the guild channel. */
  guildId?: string;
  /** The summary of the channel of the text channel. */
  summary?: string;
  /** The recipient IDs of the DM channel. */
  recipientIds?: string[];
  /** The connected members of the voice channel. */
  memberIds?: string[];

  constructor(channel: any) {
    this.id = channel._id;
    this.createdAt = channel.createdAt;
    this.name = channel.name;
    this.type = channel.type;
    this.guildId = channel.guildId;
    this.summary = channel.summary;
    this.recipientIds = channel.recipientIds;
    this.memberIds = channel.memberIds;
  }
}
