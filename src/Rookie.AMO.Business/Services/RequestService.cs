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
            var query = _baseRepository.Entities;

            query = query.Where(x => string.IsNullOrEmpty(filter.KeySearch) || x.Asset.Name.Contains(filter.KeySearch)
                                || x.Asset.Code.Contains(filter.KeySearch));


            if (!string.IsNullOrEmpty(filter.State))
            {
                IEnumerable<int> stateFilter = filter.State.Trim().Split(',').Select(s => EnumConverExtension.GetValueInt<StateList>(s));

                query = query.Where(x => stateFilter.Contains(((int)x.State)));
            }
            if (filter.ReturnedDate != default(DateTime))
            {
                query = query.Where(x => x.ReturnedDate == filter.ReturnedDate);
            }


            if (!string.IsNullOrEmpty(filter.OrderProperty))
                query = query.OrderByPropertyName(filter.OrderProperty, filter.Desc);


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
