using IdentityServer4;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Options;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AMO.Identity.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static IdentityModel.OidcConstants;

namespace Rookie.AMO.Identity
{
    public class SeedConfigurationData
    {
        public static void EnsureSeedData(string configurationConnectionString, string operationConnectionString)
        {
            var services = new ServiceCollection();

            services.AddLogging();
            services.AddDbContext<AppConfigurationDbContext>(options =>
               options.UseSqlServer(configurationConnectionString));
            services.AddDbContext<AppOperationDbContext>(options =>
               options.UseSqlServer(operationConnectionString));

            var configOptions = new ConfigurationStoreOptions();
            services.AddSingleton(configOptions);
            var operateOptions = new OperationalStoreOptions();
            services.AddSingleton(operateOptions);

            using var serviceProvider = services.BuildServiceProvider();
            using var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var operationContext = scope.ServiceProvider.GetRequiredService<AppOperationDbContext>();
            operationContext.Database.EnsureDeleted();
            operationContext.Database.Migrate();

            var context = scope.ServiceProvider.GetRequiredService<AppConfigurationDbContext>();
            context.Database.EnsureDeleted();
            context.Database.Migrate();

            var clients = new List<IdentityServer4.EntityFramework.Entities.Client>()
            {
                new IdentityServer4.EntityFramework.Entities.Client()
                {
                    ClientName = "Rookie.AMO",
                    ClientId = "rookieamoapi",
                    AllowedGrantTypes = new List<ClientGrantType>()
                    {
                        new ClientGrantType()
                        {
                            GrantType = IdentityModel.OidcConstants.GrantTypes.Implicit
                        }
                    },
                    RedirectUris = new List<ClientRedirectUri>()
                    {
                        new ClientRedirectUri()
                        {
                            RedirectUri = "https://localhost:5001/callback"
                        }
                    },
                    PostLogoutRedirectUris = new List<ClientPostLogoutRedirectUri>()
                    {
                        new ClientPostLogoutRedirectUri()
                        {
                            PostLogoutRedirectUri = "https://localhost:5001/"
                        }
                    },
                    AllowedScopes = new List<ClientScope>
                    {
                        new ClientScope()
                        {
                            Scope = IdentityServerConstants.StandardScopes.OpenId
                        },
                        new ClientScope()
                        {
                            Scope = IdentityServerConstants.StandardScopes.Profile
                        },
                        new ClientScope()
                        {
                            Scope = "rookie.amo.identity"
                        }
                    },
                    ClientSecrets = new List<ClientSecret>
                    {
                        new ClientSecret()
                        {
                            Value = "rookieecomsecret".Sha256()
                        }
                    },
                    //AllowedCorsOrigins = new List<string>
                    //{
                    //    "https://localhost:5001/"
                    //},
                    AllowAccessTokensViaBrowser = true
                },
                new IdentityServer4.EntityFramework.Entities.Client
                {
                    ClientName = "Rookie.AMO.Web",
                    ClientId = "rookieamo",
                    AllowedGrantTypes = new List<ClientGrantType>()
                    {
                        new ClientGrantType()
                        {
                            GrantType = IdentityModel.OidcConstants.GrantTypes.Implicit,
                        }
                    },
                    RedirectUris = new List<ClientRedirectUri>()
                    {
                        new ClientRedirectUri()
                        {
                            RedirectUri = "https://localhost:5011/callback"
                        }
                    },
                    PostLogoutRedirectUris = new List<ClientPostLogoutRedirectUri>()
                    {
                        new ClientPostLogoutRedirectUri()
                        {
                            PostLogoutRedirectUri = "https://localhost:5011/callback"
                        }
                    },
                    AllowedScopes = new List<ClientScope>
                    {
                        new ClientScope()
                        {
                            Scope = IdentityServerConstants.StandardScopes.OpenId
                        },
                        new ClientScope()
                        {
                            Scope = IdentityServerConstants.StandardScopes.Profile
                        },
                        new ClientScope()
                        {
                            Scope = "rookie.amo.identity"
                        },
                    },
                    ClientSecrets = new List<ClientSecret>()
                    {
                        new ClientSecret()
                        {
                            Value = "rookieamo".Sha256()
                        }
                    },
                    //AllowedCorsOrigins = new List<string>
                    //{
                    //    "https://localhost:5011/"
                    //},
                    AllowAccessTokensViaBrowser = true
                }
            };
            var result = context.Clients.AddRangeAsync(clients).IsCompletedSuccessfully;

            if (!result)
            {
                throw new Exception("Error happens when seed clients");
            }

            var identityResources = new List<IdentityServer4.EntityFramework.Entities.IdentityResource>() 
            {
                new IdentityServer4.EntityFramework.Entities.IdentityResource()
                {
                    Name = "openid",
                    UserClaims = new List<IdentityResourceClaim>()
                    {
                        new IdentityResourceClaim()
                        {
                            Type = "sub"
                        }
                    }
                },
                new IdentityServer4.EntityFramework.Entities.IdentityResource()
                {
                    Name = "profile",
                    UserClaims = new List<IdentityResourceClaim>()
                    {
                        new IdentityResourceClaim()
                        {
                            Type = "name"
                        },
                    }
                },
                new IdentityServer4.EntityFramework.Entities.IdentityResource()
                {
                    Name = "rookie.amo.identity",
                    UserClaims = new List<IdentityResourceClaim>()
                    {
                        new IdentityResourceClaim()
                        {
                            Type = "role"
                        },
                    }
                }
            };

            result = context.IdentityResources.AddRangeAsync(identityResources).IsCompletedSuccessfully;
            if (!result)
            {
                throw new Exception("Error happens when seed identity resource");
            }

            context.SaveChanges();
        }
    }
}
