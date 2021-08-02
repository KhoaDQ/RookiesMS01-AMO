import { createUserManager } from 'redux-oidc';

const localhost = 'https://localhost:5011/';
const identity = 'https://localhost:5001/';

const userManagerConfig = {
    client_id: 'rookieecom',
    client_secret: 'rookieecom',
    redirect_uri: `${localhost}callback`,
    post_logout_redirect_uri: `${localhost}`,
    response_type: 'id_token token',
    scope: 'openid profile roles',
    authority: `${identity}`,
    silent_redirect_uri: `${localhost}silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
