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

        public async Task CompleteAsync(Guid id, string adminUsername, Guid adminId)
        {

            var request = await _context.Requests.FindAsync(id);
            request.State = StateList.Completed;
            request.ReturnedDate = DateTime.Now;
            request.AcceptedBy = adminUsername;
            request.AdminId = adminId;

            var asset = await _context.Assets.FindAsync(request.AssetId);
            asset.State = StateList.Available;

            var assignment = _context.Assignments.Where(x => x.AssetID == request.AssetId).FirstOrDefault();
            if (assignment != null)
                _context.Assignments.Remove(assignment);

            await _context.SaveChangesAsync();
        }

        public async Task<PagedResponseModel<RequestDto>> PagedQueryAsync(FilterRequestsModel filter)
        {
            var query = _baseRepository.Entities;

            query = query.Where(x => string.IsNullOrEmpty(filter.KeySearch) || x.Asset.Name.Contains(filter.KeySearch)
                                || x.Asset.Code.Contains(filter.KeySearch) || x.RequestedBy.Contains(filter.KeySearch));


            if (!string.IsNullOrEmpty(filter.State))
            {
                IEnumerable<int> stateFilter = filter.State.Trim().Split(',').Select(s => EnumConverExtension.GetValueInt<StateList>(s));

                query = query.Where(x => stateFilter.Contains(((int)x.State)));
            }
            if (filter.ReturnedDate != default(DateTime) && filter.ReturnedDate != null)
            {
                query = query.Where(x => x.ReturnedDate.Value.Date == filter.ReturnedDate.Value.Date);
            }

            filter.ReturnedDate.ToString();

            if (!string.IsNullOrEmpty(filter.OrderProperty))
                switch (filter.OrderProperty)
                {
                    case "Code":
                        if (filter.Desc)
                            query = query.OrderByDescending(a => a.Asset.Code);
                        else
                            query = query.OrderBy(a => a.Asset.Code);
                        break;
                    case "Name":
                        if (filter.Desc)
                            query = query.OrderByDescending(a => a.Asset.Name);
                        else
                            query = query.OrderBy(a => a.Asset.Name);
                        break;
                    case "":
                        break;
                    default:
                        query = query.OrderByPropertyName(filter.OrderProperty, filter.Desc);
                        break;
                }


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
