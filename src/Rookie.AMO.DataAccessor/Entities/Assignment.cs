using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.DataAccessor.Entities
{
    public class Assignment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime AssignedDate { get; set; }

        [Required]
        public StateList State { get; set; }

        [Required]
        [StringLength(maximumLength: 1000)]
        public string Note { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public Guid AssetID { get; set; }

        [Required]
        public Guid User_ID { get; set; }

        [Required]
        public Guid Admin_ID { get; set; }

        public virtual Asset Asset { get; set; }

        public string AssignedBy { get; set; }

        public string AssignedTo { get; set; }
    }
}
