using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Assignment
{
    public class AssignmentUpdateRequest
    {
        public DateTime AssignedDate { get; set; }

        public string State { get; set; }

        public string Note { get; set; }

        public Guid Asset_ID { get; set; }

        public Guid User_ID { get; set; }

    }
}
