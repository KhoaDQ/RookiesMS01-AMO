import { createUserManager, loadingUser, loadUser } from 'redux-oidc';
import store from '../store';
import * as Config  from '../constants/config'

const userManagerConfig = {
    client_id: 'rookieamo',
    client_secret: 'rookieamosecret',
    redirect_uri: `${Config.BASE_URL_AZURE}callback`,
    post_logout_redirect_uri: `${Config.BASE_URL_AZURE}`,
    response_type: 'id_token token',
    scope: 'openid profile identity api',
    authority: `${Config.IDENTITY_URL_AZURE}`,
    silent_redirect_uri: `${Config.BASE_URL_AZURE}silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: true
};

const userManager = createUserManager(userManagerConfig);
loadUser(store, userManager);

export default userManager;
