export interface IUser {
  _id?: string;
  username: string;
  name: string;
  email: string;
  token: string;
}

interface IFreinds {
  _id: string;
}

export interface IUserResponse {
  _id?: string;
  name: string;
  username: string;
  friends?: [IFreinds];
}

