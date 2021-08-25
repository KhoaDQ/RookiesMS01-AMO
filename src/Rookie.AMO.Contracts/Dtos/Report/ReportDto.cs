using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Report
{
   public class ReportDto
    {
        public string CategoryName { get; set; }

        public int Total { get; set; }

        public int Assigned { get; set; }

        public int Available { get; set; }

        public int NotAvailable { get; set; }

        public int WaitingForRecycling { get; set; }

        public int Recycled { get; set; }
    }
}
