using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts.Dtos.Report;
using Rookie.AMO.Web.DataProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportViewerController : ControllerBase
    {
        private readonly IReportViewerService _reportViewerService;
        private readonly IUserService _userService;
        public ReportViewerController(IReportViewerService reportViewerService, IUserService userService)
        {
            _reportViewerService = reportViewerService;
            _userService = userService;
        }

        [HttpGet("report")]
        public async Task<IEnumerable<ReportDto>> GetAllRolesAsync()
        {
            return await _reportViewerService.GetAllAsync();
        }

    }
}
