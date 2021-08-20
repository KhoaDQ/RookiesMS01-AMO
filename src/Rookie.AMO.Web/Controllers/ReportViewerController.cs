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
        private readonly IExportProvider _exportProvider;
        public ReportViewerController(IReportViewerService reportViewerService, IExportProvider exportProvider)
        {
            _reportViewerService = reportViewerService;
            _exportProvider = exportProvider;
        }

        [HttpGet("report")]
        public async Task<IEnumerable<ReportDto>> GetAllRolesAsync()
        {
            return await _reportViewerService.GetAllAsync();
        }

        [HttpGet("export")]
        public async Task<FileContentResult> ExportReport()
        {
            var report = await _reportViewerService.GetAllAsync() as List<ReportDto>;

            var file = _exportProvider.Export<ReportDto>(report, "report", "report");

            return new FileContentResult(file, "application/octet-stream")
            {
                FileDownloadName = $"report_{DateTime.Now.ToString("yyyyMMdd")}.xlsx"
            };
        }
    }
}
