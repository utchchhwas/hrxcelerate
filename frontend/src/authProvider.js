import jwtDecode from 'jwt-decode';

const authProvider = {
  async signIn(data) {
    const accessToken = data.access;
    localStorage.setItem('accessToken', accessToken);
  },

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken:', accessToken);
    if (accessToken) {
      console.log(accessToken);
      const accessTokenData = jwtDecode(accessToken);
      const tokenExpireTime = accessTokenData.exp * 1000;
      const currentTime = Date.now();
      if (tokenExpireTime > currentTime) {
        return true;
      } else {
        this.signOut();
        return false;
      }
    }
    return false;
  },

  signOut() {
    localStorage.removeItem('accessToken');
  },
};

export default authProvider;
