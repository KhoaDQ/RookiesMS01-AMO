using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Identity.DataAccessor.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime JoinedDate { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }
        public string CodeStaff { get; set; }
        public string Location { get; set; }
        public bool Disable { get; set; }
    }
}
