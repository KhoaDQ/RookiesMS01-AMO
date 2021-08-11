using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Rookie.AMO.DataAccessor.Entities
{
    public class Category : BaseEntity
    {
        [Required]
        public string Code { get; set; }

        public virtual ICollection<Asset> Assets{ get; set; }
    }
}
