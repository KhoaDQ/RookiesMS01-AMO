using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Request
{
    public class RequestDto
    {
        public Guid Id { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime AcceptedDate { get; set; }
        public DateTime ReturnedDate { get; set; }
        public string State { get; set; }
        public string Note { get; set; }
        public string RequestedBy { get; set; }
        public string AcceptedBy { get; set; }
    }
}
