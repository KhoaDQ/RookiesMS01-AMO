﻿using IdentityServer4.EntityFramework.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AMO.Identity.DataAccessor.Data;
using Rookie.AMO.Identity.DataAccessor.Entities;
using Rookie.AMO.Identity.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.DataAccessor
{
    public class SeedIdentityData
    {
        public static void EnsureSeedData(string connectionString)
        {
            var services = new ServiceCollection();
            services.AddLogging();

            services.AddDbContext<AppIdentityDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddIdentity<User, IdentityRole>()
                    .AddEntityFrameworkStores<AppIdentityDbContext>()
                    .AddDefaultTokenProviders();

            using var serviceProvider = services.BuildServiceProvider();
            using var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = scope.ServiceProvider.GetService<AppIdentityDbContext>();
            context.Database.Migrate();

            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            
            var admin = roleMgr.FindByNameAsync("Admin").Result;
            if (admin == null)
            {
                admin = new IdentityRole
                {
                    Name = "Admin",
                };

                var result = roleMgr.CreateAsync(admin).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }

            var customer = roleMgr.FindByNameAsync("Staff").Result;
            if (customer == null)
            {
                customer = new IdentityRole()
                {
                    Name = "Staff"
                };

                var result = roleMgr.CreateAsync(customer).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

            }

            var user1 = userMgr.FindByNameAsync("johnd").Result;
            if (user1 == null)
            {
                user1 = new User
                {
                    FirstName = "John",
                    LastName = "Doe",
                    FullName = "John Doe",
                    UserName = "johnd",
                    CodeStaff = "SD0001",
                    Type = "Admin",
                    Gender = "Male",
                    Location = "HN"
                };
                var result = userMgr.CreateAsync(user1, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(user1, new List<Claim>
                    {
                        new Claim(IdentityModel.JwtClaimTypes.GivenName, "John"),
                        new Claim(IdentityModel.JwtClaimTypes.FamilyName, "Doe"),
                        new Claim(IdentityModel.JwtClaimTypes.Role, "Admin"),
                        new Claim("location", "HN")
                    }).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddToRoleAsync(user1, "Admin").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }

            var user2 = userMgr.FindByNameAsync("johnd1").Result;
            if (user2 == null)
            {
                userMgr.FindByNameAsync("John Doe");
                user2 = new User
                {
                    FirstName = "John",
                    LastName = "Doe",
                    FullName = "John Doe",
                    UserName = "johnd1",
                    CodeStaff = "SD0002",
                    Type = "Staff",
                    Gender = "Male"
                };
                var result = userMgr.CreateAsync(user2, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(user2, new List<Claim>
                    {
                        new Claim(IdentityModel.JwtClaimTypes.GivenName, "John"),
                        new Claim(IdentityModel.JwtClaimTypes.FamilyName, "Doe"),
                        new Claim(IdentityModel.JwtClaimTypes.Role, "Staff"),
                        new Claim("location", "HN")
                    }).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                result = userMgr.AddToRoleAsync(user2, "Staff").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }
        }
    }
}
