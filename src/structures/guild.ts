export class Guild {
  id: string;
  name: string;
  createdAt: Date;
  nameAcronym: string;
  iconURL: string;
  // owner: UserDocument;
  channels: Channel[];
  members: GuildMemberDocument[];
  // roles: RoleDocument[];
}
