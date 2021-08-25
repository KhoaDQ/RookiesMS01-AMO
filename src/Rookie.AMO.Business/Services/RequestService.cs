using AutoMapper;
using EnsureThat;
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
        private readonly IBaseRepository<Assignment> _assignmentRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public RequestService(IBaseRepository<Request> baseRepository,IBaseRepository<Assignment> assignmentRepository, IMapper mapper, ApplicationDbContext context)
        {
            _baseRepository = baseRepository;
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RequestDto> AddAsync(RequestAddRequest requestAddRequest)
        {
            Ensure.Any.IsNotNull(requestAddRequest, nameof(requestAddRequest));
            var request = _mapper.Map<Request>(requestAddRequest);

            var assignment = await _assignmentRepository.GetByIdAsync(requestAddRequest.AssignmentID);

            request.AssetID = assignment.AssetID;
            request.AssignedDate = assignment.AssignedDate;
            request.State = StateList.WaitingReturn;
            request.AssignedBy = assignment.AssignedBy;
            request.AssignedTo = assignment.AssignedTo;

            var item = await _baseRepository.AddAsync(request);
            return _mapper.Map<RequestDto>(item);
        }

        public async Task<IEnumerable<RequestHistoryDto>> GetByIdAssetAsync(Guid assetId)
        {
            var query = await _baseRepository.GetAllAsync();
            var history = query.Where(x => x.AssetID == assetId && x.ReturnedDate.HasValue);

            return _mapper.Map<List<RequestHistoryDto>>(history);
        }

        public async Task CompleteAsync(Guid id, string adminUsername, Guid adminId)
        {

            var request = await _context.Requests.FindAsync(id);
            request.State = StateList.Completed;
            request.ReturnedDate = DateTime.Now;
            request.AcceptedBy = adminUsername;
            request.AdminID = adminId;

            var asset = await _context.Assets.FindAsync(request.AssetID);
            asset.State = StateList.Available;

            var assignment = (from a in _context.Assignments
                              where a.AssetID == request.AssetID
                              select a).FirstOrDefault();

            if (assignment != null)
                _context.Assignments.Remove(assignment);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var request = _context.Requests.FirstOrDefault(x => (x.Id == id));
            _context.Requests.Remove(request);
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
