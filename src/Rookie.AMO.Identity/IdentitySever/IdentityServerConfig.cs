using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.IdentitySever
{
    public class IdentityServerConfig
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
           new List<IdentityResource>
           {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
           };

        public static IEnumerable<ApiScope> ApiScopes =>
             new ApiScope[]
             {
                  new ApiScope("Rookie.AMO.Identity", "Rookie AMO IDENTITY")
             };
        public static IEnumerable<Client> Clients => new List<Client>
        {
           new Client
                {
                    ClientName = "Rookie.AMO",
                    ClientId = "rookieecomclient",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:5001/swagger/oauth2-redirect.html"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:5001/"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "Rookie.AMO.Identity"
                    },
                    ClientSecrets =
                    {
                        new Secret("rookieecomsecret".Sha256())
                    },
                    //AllowedCorsOrigins = new List<string>
                    //{
                    //    "https://localhost:5001/"
                    //},
                    AllowAccessTokensViaBrowser = true
                },
                new Client
                {
                    ClientName = "Rookie.AMO.Web",
                    ClientId = "rookieecom",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:5011/callback"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:5011/"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles"
                    },
                    ClientSecrets =
                    {
                        new Secret("rookieecom".Sha256())
                    },
                    //AllowedCorsOrigins = new List<string>
                    //{
                    //    "https://localhost:5011/"
                    //},
                    AllowAccessTokensViaBrowser = true
                }
            };
        }
}
