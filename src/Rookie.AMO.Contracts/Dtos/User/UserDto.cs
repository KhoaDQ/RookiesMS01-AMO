using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        [DataType(DataType.Date)]
        public DateTime JoinedDate { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }
        public string CodeStaff { get; set; }
        public string Location { get; set; }
    }
}
