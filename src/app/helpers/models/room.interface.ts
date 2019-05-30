export interface IRoomUser {
  _id: String;
  name: String;
}

export interface IRoom {
  name: string;
  activeUsers: {
    users: [IRoomUser];
  };
  createdAt: Date;
  createdBy: String;
  updatedBy: String;
}
