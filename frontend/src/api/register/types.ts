export interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  token: string;
}
