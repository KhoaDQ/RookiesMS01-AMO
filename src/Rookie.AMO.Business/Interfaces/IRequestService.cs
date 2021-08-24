using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Interfaces
{
    public interface IRequestService
    {
        Task<RequestDto> AddAsync(RequestAddRequest requestAddRequest);
        Task<PagedResponseModel<RequestDto>> PagedQueryAsync(FilterRequestsModel filter);
        Task CompleteAsync(Guid id, string adminUsername, Guid adminId);
        Task DeleteAsync(Guid id);
    }
}
