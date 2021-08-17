using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Assignment
{
    public class AssignmentRequest
    {
        public Guid User_ID { get; set; }
        public Guid AssetID { get; set; }
        public DateTime AssignedDate { get; set; }
        public string Note { get; set; }
        
    }
}
