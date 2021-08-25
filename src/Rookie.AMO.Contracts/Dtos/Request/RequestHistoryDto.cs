using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Request
{
    public class RequestHistoryDto
    {
        public DateTime AssignedDate { get; set; }
        public DateTime ReturnedDate { get; set; }
        public string AssignedBy { get; set; }

        public string AssignedTo { get; set; }
    }
}
