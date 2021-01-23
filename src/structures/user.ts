export class User {
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

  friendRequests: FriendRequest[];
  friends: string[];

  constructor(user: any) {
    this.id = user._id;
    this.badges = user.badges;
    this.bot = user.bot;
    this.username = user.username;
    this.createdAt = user.createdAt;
    this.avatarURL = user.avatarURL;
    this.status = user.status;
    this.voice = user.voice;
    this.friendRequests = user.friendRequests;
    this.friends = user.friends;
  }
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
