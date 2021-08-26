using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.DataAccessor.Entities
{
    public class MappingRequest
    {
        [Key]
        public Guid Id { get; set; }

        public Guid? AssignmentId { get; set; }

        public Guid? RequestId { get; set; }

        public virtual Assignment Assignment { get; set; }

        public virtual Request Request { get; set; }
    }
}
