using Rookie.AMO.DataAccessor.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Rookie.AMO.DataAccessor.Entities
{
    public class Asset : BaseEntity
    {
        [Required]
        public string Code { get; set; }

        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime InstalledDate { get; set; }

        [Required]
        [StringLength(maximumLength: 1000)]
        public string Specification { get; set; }

        [Required]
        public StateList State { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
