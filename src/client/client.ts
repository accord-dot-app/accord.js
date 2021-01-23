import { Guild } from '../structures/guild';
import { User } from '../structures/user';
import Deps from '../utils/deps';
import { ClientOptions } from './client-options';
import { HTTPClient } from './http-client';
import { WSClient } from './ws-client';

const ws = Deps.get<WSClient>(WSClient);
const http = Deps.get<HTTPClient>(HTTPClient);

export class Client {
  private _user: User;
  get user() { return this._user; }

  private token: string;

  get authHeaders() {
    return { Authorization: this.token };
  }

  guilds = new Map<string, Guild>();
  users = new Map<string, User>();

  constructor(private options: ClientOptions = {}) {
    this.options = {
      ...options
    }
  }

  /** Login the DClone client. */
  async login(token: string) {
    if (!token)
      throw new TypeError('Token not provided');

    this.token = token;

    await this.ready();
      
    return this.token;
  }

  private async ready() {
    await this.fetchSelf();
    await this.fetchGuilds();
    await this.fetchUsers();

    await ws.ready();
  }

  /** Manually fetch client user from the API. */
  async fetchSelf() {
    this._user = await http.get('users', this.authHeaders);

    return this.user;
  }

  /** Manually update and fetch guilds from the API. */
  async fetchGuilds() {
    const guilds = await http.get('guilds', this.authHeaders);
    for (const guild of guilds)
      this.guilds.set(guild._id, {
        ...guild,
        id: guild._id
      } as Guild);

    return this.guilds;
  }

  /** Manually update and fetch users in mutual guilds from the API. */
  async fetchUsers() {
    const users = await http.get('users/known', this.authHeaders);
    for (const user of users)
      this.users.set(user._id, {
        ...user,
        id: user._id
      } as User);

    return this.users;
  }
}
