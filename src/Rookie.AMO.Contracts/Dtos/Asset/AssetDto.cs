using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Asset
{
    public class AssetDto
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public DateTime InstalledDate { get; set; }

        public string Specification { get; set; }

        public StateList State { get; set; }

        public string Location { get; set; }

        public Guid CategoryId { get; set; }
    }
}
