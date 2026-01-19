export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  currency?: string; 
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  expiresIn: number;
}