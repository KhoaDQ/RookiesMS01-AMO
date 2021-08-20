using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Assignment
{
    public class AssignmentDto
    {
        public Guid Id { get; set; }
        public string AssetCode { get; set; }

        public string AssetName { get; set; }

        public string Specification { get; set; }

        public string AssignedTo { get; set; }

        public string AssignedBy { get; set; }

        public DateTime AssignedDate { get; set; }

        public string State { get; set; }

        public string Note { get; set; }
    }
}
