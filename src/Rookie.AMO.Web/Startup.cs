using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Rookie.AMO.Business;
using Rookie.AMO.Web.Filters;
using Rookie.AMO.Web.Security;
using Rookie.AMO.Web.Security.Requirement;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Rookie.AMO.Web.DataProviders;
using Refit;

namespace Rookie.AMO.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            services.AddControllersWithViews(x =>
            {
                x.Filters.Add(typeof(ValidatorActionFilter));
            })
            .AddFluentValidation(fv =>
            {
                fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
                fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
            })
            .AddJsonOptions(ops =>
            {
                ops.JsonSerializerOptions.IgnoreNullValues = true;
                ops.JsonSerializerOptions.WriteIndented = true;
                ops.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                ops.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                ops.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            services.AddHttpContextAccessor();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                 .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                 {
                     options.Authority = Configuration["IdentityServer:Authority"];
                     options.RequireHttpsMetadata = Convert.ToBoolean(Configuration["IdentityServer:RequireHttpsMetadata"]);
                     options.Audience = Configuration["IdentityServer:Audiance"];
                     options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                     {
                         NameClaimType = IdentityModel.JwtClaimTypes.Name,
                         RoleClaimType = IdentityModel.JwtClaimTypes.Role,
                         ValidateAudience = Convert.ToBoolean(Configuration["IdentityServer:TokenValidationParameters:ValidateAudience"])
                     };
                 });

            services.AddSingleton<IAuthorizationHandler, AdminRoleHandler>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ADMIN_ROLE_POLICY", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.Requirements.Add(new AdminRoleRequirement());
                });
            });


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EcomWeb.API", Version = "v1" });
            });
            services.AddBusinessLayer(Configuration);

            services
                .AddRefitClient<IUserService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(Configuration["IdentityServer:Authority"]));
            services
                .AddRefitClient<IRoleService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(Configuration["IdentityServer:Authority"]));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(
                    options => options.WithOrigins("http://localhost:3000").AllowAnyMethod()
            );
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseSwagger()
                .UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
