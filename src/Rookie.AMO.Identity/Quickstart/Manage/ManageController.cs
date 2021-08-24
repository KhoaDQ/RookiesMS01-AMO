using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServerHost.Quickstart.UI;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Identity.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.Quickstart.Manage
{
    public class ManageController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IEventService _events;

        public ManageController(
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IAuthenticationSchemeProvider schemeProvider,
            IEventService events,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

            _interaction = interaction;
            _clientStore = clientStore;
            _schemeProvider = schemeProvider;
            _events = events;
        }
        // GET: /Manage/Index
        [HttpGet]
        public async Task<IActionResult> Index(ManageMessageId? message = null)
        {
            ViewData["StatusMessage"] =
                message == ManageMessageId.ChangePasswordSuccess ? "Your password has been changed."
                : message == ManageMessageId.SetPasswordSuccess ? "Your password has been set."
                : message == ManageMessageId.SetTwoFactorSuccess ? "Your two-factor authentication provider has been set."
                : message == ManageMessageId.Error ? "An error has occurred."
                : message == ManageMessageId.AddPhoneSuccess ? "Your phone number was added."
                : message == ManageMessageId.RemovePhoneSuccess ? "Your phone number was removed."
                : "";

            var user = await GetCurrentUserAsync();
            var model = new IndexViewModel
            {
                HasPassword = await _userManager.HasPasswordAsync(user),
                PhoneNumber = await _userManager.GetPhoneNumberAsync(user),
                TwoFactor = await _userManager.GetTwoFactorEnabledAsync(user),
                Logins = await _userManager.GetLoginsAsync(user),
                BrowserRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user),
                AuthenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user)
            };
            return View(model);
        }

        // GET: /Manage/ChangePassword
        [HttpGet]
        public async Task<IActionResult> ChangePassword([FromQuery]string returnUrl = "")
        {
            var vm = await BuildChangePasswordViewModelAsync(returnUrl);

            return View(vm);
        }

        //
        // POST: /Manage/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(ChangePasswordInputModel model, string button)
        {
            var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            // the user clicked the "cancel" button
            if (button != "changepassword")
            {
                if (context != null)
                {
                    // if the user cancels, send a result back into IdentityServer as if they 
                    // denied the consent (even if this client does not require consent).
                    // this will send back an access denied OIDC error response to the client.
                    await _interaction.DenyAuthorizationAsync(context, AuthorizationError.AccessDenied);

                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    if (context.IsNativeClient())
                    {
                        // The client is native, so this change in how to
                        // return the response is for better UX for the end user.
                        return this.LoadingPage("Redirect", model.ReturnUrl);
                    }

                    return Redirect(model.ReturnUrl);
                }
                else
                {
                    // since we don't have a valid context, then we just go back to the home page
                    return Redirect("~/");
                }
            }

            if (!ModelState.IsValid)
            {
                var vm = await BuildChangePasswordViewModelAsync(model.ReturnUrl);
                return View(vm);
            }
            var user = await GetCurrentUserAsync();
            if (user != null)
            {
                if (user.ChangePasswordTimes == 0 && string.IsNullOrEmpty(model.OldPassword))
                {
                    model.OldPassword = $"{user.UserName}@{user.DateOfBirth.Date:ddMMyyyy}";
                }

                var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                user.ChangePasswordTimes++;
                var update = await _userManager.UpdateAsync(user);
                if (result.Succeeded && update.Succeeded)
                {
                    return Redirect(model.ReturnUrl);
                }

                if (!result.Succeeded)
                {
                    AddErrors(result);
                }

                if (!update.Succeeded)
                {
                    AddErrors(update);
                }

                return View(model);
            }
            return RedirectToAction(nameof(Index), new { Message = ManageMessageId.Error });
        }

        public enum ManageMessageId
        {
            AddPhoneSuccess,
            AddLoginSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            Error
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private Task<User> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

        private async Task<ChangePasswordViewModel> BuildChangePasswordViewModelAsync(string returnUrl)
        {
            var user = await GetCurrentUserAsync();

            return new ChangePasswordViewModel
            {
                ReturnUrl = returnUrl,
                ChangePasswordTimes = user.ChangePasswordTimes,
                OldPassword = "",
                NewPassword = "",
                ConfirmPassword = ""
            };
        }

        private async Task<ChangePasswordInputModel> BuildChangePasswordInputModelAsync(string returnUrl)
        {
            var user = await GetCurrentUserAsync();

            return new ChangePasswordInputModel
            {
                ReturnUrl = returnUrl,
                ChangePasswordTimes = user.ChangePasswordTimes,
                OldPassword = "",
                NewPassword = "",
                ConfirmPassword = ""
            };
        }
    }
}
