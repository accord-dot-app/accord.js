import EventEmitter from 'events';
import { Channel } from '../structures/channel';
import { Guild } from '../structures/guild';
import { User } from '../structures/user';
import Deps from '../utils/deps';
import { ClientOptions } from './client-options';
import { HTTPClient } from './http-client';
import { WSClient } from './ws-client';

const http = Deps.get<HTTPClient>(HTTPClient);

export class Client {
  public readonly ws = new WSClient(this);
  public readonly emitter = new EventEmitter();

  private _user: User;
  get user() { return this._user; }

  private token: string;

  public get authHeaders() {
    return { Authorization: this.token };
  }
  
  channels = new Map<string, Channel>();
  guilds = new Map<string, Guild>();
  users = new Map<string, User>();

  constructor(private options: ClientOptions = {}) {
    this.options = {
      ...options
    }

    Deps.add<Client>(this);
  }

  /** Listen to DClone API events. */
  public on(event: ClientEvent, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  /** Login the DClone client. */
  public async login(token: string) {
    if (!token)
      throw new TypeError('Token not provided');

    this.token = token;

    try {
      await this.ready();
    } catch {
      throw new TypeError('Invalid token provided');
    }
      
    return this.token;
  }

  private async ready() {
    await this.fetchSelf();
    await this.fetchGuilds();
    await this.fetchUsers();

    await this.ws.ready();
  }

  /** Manually fetch client user from the API. */
  public async fetchSelf() {
    const dbUser = await http.get('users', this.authHeaders);
    this._user = new User(dbUser);    
    return this.user;
  }

  /** Manually update and fetch guilds from the API. */
  public async fetchGuilds() {
    const guilds = await http.get('guilds', this.authHeaders);
    for (const guild of guilds) {
      this.guilds.set(guild._id, new Guild(guild));

      for (const channel of guild.channels)
        this.channels.set(channel._id, new Channel(channel));
    }

    return this.guilds;
  }

  /** Manually update and fetch DM channels from the API. */
  public async fetchDMChannels() {
    const channels = await http.get('users/dm-channels', this.authHeaders);
    for (const channel of channels)
      this.channels.set(channel._id, new Channel(channel));

    return this.channels;
  }

  /** Manually update and fetch users in mutual guilds from the API. */
  public async fetchUsers() {
    const users = await http.get('users/known', this.authHeaders);
    for (const user of users)
      this.users.set(user._id, new User(user));

    return this.users;
  }
}

export type ClientEvent = 'ready' | 'message';
