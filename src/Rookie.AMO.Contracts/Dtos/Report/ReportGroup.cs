using Rookie.AMO.DataAccessor.Enums;


namespace Rookie.AMO.Contracts.Dtos.Report
{
    public class ReportGroup
    {
         public string CategoryName { get; set; }

        public StateList State { get; set; }

        public int Count { get; set; }
    }
}
