﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Contracts
{
    public class FilterRequestsModel
    {
        public string State { get; set; } = "";
        public DateTime? ReturnedDate { get; set; } = default(DateTime);
        public string KeySearch { get; set; } = "";
        public string OrderProperty { get; set; } = "";
        public bool Desc { get; set; } = true;
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 18;
    }
}
