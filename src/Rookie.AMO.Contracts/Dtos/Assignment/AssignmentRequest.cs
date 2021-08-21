using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Assignment
{
    public class AssignmentRequest
    {
        public Guid AdminID { get; set; }
        public Guid UserID { get; set; }
        public Guid AssetID { get; set; }
        public DateTime AssignedDate { get; set; }
        public string Note { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }

    }
}
