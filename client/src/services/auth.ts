import Keycloak from 'keycloak-js';
import config from './keycloak.json';

const _kc = new Keycloak(config);

const initKeycloak = (onAuthenticated: () => unknown) => {
  _kc.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
  }).then((auth: boolean) => {
    if (auth) {
      console.log('parsed-token', _kc.tokenParsed);
      console.log('token', _kc.token);
      onAuthenticated();
    } else {
        console.warn('Not authenticated');
        login();
    }
  })
  .catch((error: string) => {
    console.error(error);
  });
};

const login = () => _kc.login();
const logout = () => _kc.logout();

const getAccessToken = () => _kc.token;

const updateAccessToken = (onSuccess: () => unknown) => {
  _kc.updateToken(5)
    .then(onSuccess)
    .catch(login);
};

const getUserName = () => _kc.tokenParsed?.preferred_username;

const hasRole = (role: string) => _kc.hasRealmRole(role);

export default {
  initKeycloak,
  login,
  logout,
  getAccessToken,
  updateToken: updateAccessToken,
  getUserName,
  hasRole,
};
