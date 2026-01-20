export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  expiresIn: number;
}