import { createUserManager } from 'redux-oidc';

const localhost = 'https://localhost:5011/';
const identity = 'https://localhost:5001/';

const userManagerConfig = {
    client_id: 'rookieamo',
    client_secret: 'rookieamosecret',
    redirect_uri: `${localhost}callback`,
    post_logout_redirect_uri: `${localhost}`,
    response_type: 'id_token token',
    scope: 'openid profile identity api',
    authority: `${identity}`,
    silent_redirect_uri: `${localhost}silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
