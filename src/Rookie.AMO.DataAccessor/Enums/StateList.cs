using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.DataAccessor.Enums
{
    public enum StateList
    {
        Assigned = 1,
        Available = 2,
        NotAvailable = 3,
        WaitingRecycle = 4,
        Recycled = 5,
        WaitingAccept = 6,
        Accepted = 7,
        WaitingReturn = 8,
        Completed = 9
    }
}
