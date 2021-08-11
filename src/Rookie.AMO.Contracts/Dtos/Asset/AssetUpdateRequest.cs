using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts.Dtos.Asset
{
    public class AssetUpdateRequest
    {
        public string Name { get; set; }

        public DateTime InstalledDate { get; set; }

        public string Specification { get; set; }

        public string State { get; set; }
    }
}
