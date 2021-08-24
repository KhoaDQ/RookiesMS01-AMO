const origin_azure = 'https://batch2group1.azurewebsites.net/';
const identity_azure = 'https://batch2group1-idp.azurewebsites.net/';

const origin = "https://localhost:5011/"
const identity = "https://localhost:5001/"

export const IDENTITY_URL_AZURE = identity;
export const API_URL_AZURE = origin + 'api';
export const BASE_URL_AZURE = origin;


export const Method = {
  Get: 'get',
  Put: 'put',
  Delete: 'delete',
  Post: 'post',
};

export const UserEndpoint = '/api/user';
export const RoleEndpoint = '/api/role';
