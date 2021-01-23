export interface User {
  /** 18 digit snowflake ID of the user. */
  id: string;
  /** Badges that the user has. */
  badges: BadgeType[];
  /** Whether the user is a bot user. */
  bot: boolean;
  /** The unique username of the user. */
  username: string;
  /** The time that the user was created. */
  createdAt: Date;
  /** The display avatar URL of the user. */
  avatarURL: string;
  /** Current status of the user (e.g. 'ONLINE'). */
  status: StatusType;
  /** The voice state of the user. */
  voice: UserVoiceState;
}

export type StatusType = 'ONLINE' | 'DND' | 'IDLE' | 'OFFLINE';

export class UserVoiceState {
  channelId: string;
  guildId: string;
  selfMuted = false;
  connected = false;
}

export interface FriendRequest {
  userId: string,
  type: FriendRequestType
}

export type FriendRequestType = 'OUTGOING' | 'INCOMING';
export type BadgeType = 'VIEWER' | 'DEVELOPER';
