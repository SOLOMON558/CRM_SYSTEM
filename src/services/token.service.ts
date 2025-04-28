class TokenService {
  private localAccessToken: string | null = null;

  get accessToken(): string | null {
    return this.localAccessToken;
  }

  set accessToken(token: string | null) {
    this.localAccessToken = token;
  }

  clearAccessToken() {
    this.localAccessToken = null;
  }
}

export const tokenService = new TokenService();