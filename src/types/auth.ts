export interface UserRegistration { 
	login: string; 
	username: string; 
	password: string; 
	email: string; 
	phone?: string;
	prefix?: string;
  }
  
  export interface AuthData { 
	login: string; 
	password: string; 
  }
  
  export interface RefreshToken { 
	refreshToken: string; 
  }
  
  export interface Profile { 
	id: number; 
	username: string; 
	email: string; 
	date: string; 
	isBlocked: boolean; 
	roles: Role[]; 
	phoneNumber: string; 
  }

  type Role = "ADMIN" | "USER" | "MODERATOR"
  
export type ProfileRequest = Pick<Profile, 'username'| 'email'| 'phoneNumber'> 
  
  export interface Token {
   accessToken: string
   refreshToken: string
  
  }