using AutoMapper;
using Rookie.AMO.Business.Extensions;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.Request;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.DataAccessor.Entities;
using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Services
{
    public class RequestService : IRequestService
    {
        private readonly IBaseRepository<Request> _baseRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public RequestService(IBaseRepository<Request> baseRepository, IMapper mapper, ApplicationDbContext context)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<PagedResponseModel<RequestDto>> PagedQueryAsync(FilterRequestsModel filter)
        {
            // 1. Select Join
            var query = from r in _context.Requests
                        join a in _context.Assets on r.AssetID equals a.Id
                        select new { r, a };
            // 2. Filter
            if (!string.IsNullOrEmpty(filter.State))
            {
                IEnumerable<int> stateFilter = filter.State.Trim().Split(',').Select(s => EnumConverExtension.GetValueInt<StateList>(s));

                query = query.Where(x => stateFilter.Contains(((int)x.r.State)));
            }


            if (!string.IsNullOrEmpty(filter.OrderProperty))
                query = query.OrderByPropertyName(filter.OrderProperty, filter.Desc);

            // 3. Paging
            var requests = await query
                .PaginateAsync(filter.Page, filter.Limit);

            return new PagedResponseModel<RequestDto>
            {
                CurrentPage = requests.CurrentPage,
                TotalPages = requests.TotalPages,
                TotalItems = requests.TotalItems,
                Items = _mapper.Map<IEnumerable<RequestDto>>(requests.Items)
            };
        }
    }
}
