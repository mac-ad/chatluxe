// register payload
export interface RegisterPayload {
  username: string;
  email: string;
}

// login payload
export interface LoginPayload {
  username: string;
}

export interface User {
  _id: string;
  avatar: {
    url: string;
    _id: string;
  };
  username: string;
  email: string;
  isEmailVerified: boolean;
  friends: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface logInResponse {
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message: string | undefined;
  success: boolean;
}

export interface UserShort {
  _id: string;
  avatar: {
    url: string;
    _id: string;
  };
  username: string;
}
