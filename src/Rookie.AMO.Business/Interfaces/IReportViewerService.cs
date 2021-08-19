using Rookie.AMO.Contracts.Dtos.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Interfaces
{
    public interface IReportViewerService
    {
        Task<IEnumerable<ReportDto>> GetAllAsync();
    }
}
