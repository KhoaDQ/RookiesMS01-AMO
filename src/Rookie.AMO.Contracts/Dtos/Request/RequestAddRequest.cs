using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Request
{
    public class RequestAddRequest
    {
        public Guid AssignmentID { get; set; }

        public Guid UserID { get; set; }

        public string RequestedBy { get; set; }

    }
}
