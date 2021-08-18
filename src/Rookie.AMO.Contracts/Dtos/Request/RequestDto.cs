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
        public DateTime AssignedDate { get; set; }
        public DateTime AcceptedDate { get; set; }
        public DateTime ReturnedDate { get; set; }
        public StateList State { get; set; }
        public string Note { get; set; }
        public Guid AssetID { get; set; }
        public Guid User_ID { get; set; }
        public Guid Admin_ID { get; set; }
    }
}
