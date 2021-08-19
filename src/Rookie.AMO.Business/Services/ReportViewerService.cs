using Microsoft.EntityFrameworkCore;
using Rookie.AMO.Contracts.Dtos.Report;
using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.DataAccessor.Entities;

namespace Rookie.AMO.Business.Services
{
    public class ReportViewerService : IReportViewerService
    { 
        private readonly IBaseRepository<Asset> _assetRepository;
        public ReportViewerService(IBaseRepository<Asset> assetRepository)
        {
            _assetRepository = assetRepository;   
        }

        public async Task<IEnumerable<ReportDto>> GetAllAsync()
        {
            var listReport =  new List<ReportDto>();

            var reportGroups = await _assetRepository.Entities
                .Include(asset => asset.Category)
                .GroupBy(asset => new { asset.Category.Name, asset.State })
                .Select(group => new ReportGroup
                {
                    CategoryName = group.Key.Name,
                    State =(StateList)group.Key.State,
                    Count = group.Count(),
                })
                .ToListAsync();
            foreach (var reportGroup in reportGroups)
            {
                var isExist = listReport.FindIndex(report => report.CategoryName.Equals(reportGroup.CategoryName));

                if (isExist > -1)
                {
                    listReport[isExist].CategoryName = reportGroup.CategoryName;

                    listReport[isExist].SetProperty(reportGroup.State.GetNameString(), reportGroup.Count);
                    listReport[isExist].Total += reportGroup.Count;
                }
                else
                {
                    var newReport = new ReportDto
                    {
                        CategoryName = reportGroup.CategoryName,
                        Total = reportGroup.Count,

                    };
                    newReport.SetProperty(reportGroup.State.GetNameString(), reportGroup.Count);

                    listReport.Add(newReport);
                }
            }

            return listReport;
        }
    }
}
