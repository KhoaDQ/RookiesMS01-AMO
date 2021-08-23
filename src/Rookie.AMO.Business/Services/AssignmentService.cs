using AutoMapper;
using EnsureThat;
using Rookie.AMO.Business.Extensions;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.Assignment;
using Rookie.AMO.DataAccessor.Data;
using Rookie.AMO.DataAccessor.Entities;
using Rookie.AMO.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IBaseRepository<Assignment> _baseRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public AssignmentService(IBaseRepository<Assignment> baseRepository, IMapper mapper, ApplicationDbContext context)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<AssignmentDto> AddAsync(AssignmentRequest assignmentRequest)
        {
            Ensure.Any.IsNotNull(assignmentRequest, nameof(assignmentRequest));
            var assignment = _mapper.Map<Assignment>(assignmentRequest);
            assignment.State = (StateList)EnumConverExtension.GetValueInt<StateList>("WaitingAccept");
            var item = await _baseRepository.AddAsync(assignment);
            return _mapper.Map<AssignmentDto>(item);
        }

   
        public async Task DeleteAsync(Guid id)
        {
            await _baseRepository.DeleteAsync(id);
        }

        public async Task<AssignmentDto> UpdateAsync(Guid id, AssignmentUpdateRequest request)
        {

            var assignmentUpdate = _mapper.Map<Assignment>(request);

            var assignment = await _context.Assignments.FindAsync(id);

            assignment.UserID = assignmentUpdate.UserID;
            assignment.AssignedTo = assignmentUpdate.AssignedTo;
            assignment.AssetID = assignmentUpdate.AssetID;
            assignment.AssignedDate = assignmentUpdate.AssignedDate;
            assignment.Note = assignmentUpdate.Note;

            if (((int)assignmentUpdate.State) != 0)
                assignment.State = assignmentUpdate.State;

            await _context.SaveChangesAsync();

            return _mapper.Map<AssignmentDto>(assignment);
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllAsync()
        {
            var assignments = await _baseRepository.GetAllAsync();
            return _mapper.Map<List<AssignmentDto>>(assignments);
        }

        public async Task<AssignmentDto> GetByIdAsync(Guid id)
        {
            var assignment = await _baseRepository.GetByIdAsync(id);
            return _mapper.Map<AssignmentDto>(assignment);
        }

        public async Task<IEnumerable<AssignmentDto>> GetByUserIdAsync(Guid userId)
        {
            var assignments = await _baseRepository.GetAllAsync();
            var assignmentsByUser = assignments.Where(x => x.UserID == userId && x.AssignedDate <= DateTime.Now);
            return _mapper.Map<IEnumerable<AssignmentDto>>(assignments);
        }

        public async Task<PagedResponseModel<AssignmentDto>> PagedQueryAsync(FilterAssignmentsModel filter)
        {

            var query = _baseRepository.Entities;

            query = query.Where(x => string.IsNullOrEmpty(filter.KeySearch)|| x.Asset.Name.Contains(filter.KeySearch)
                                || x.Asset.Code.Contains(filter.KeySearch) || x.AssignedTo.Contains(filter.KeySearch));


            if (!string.IsNullOrEmpty(filter.State))
            {
                IEnumerable<int> stateFilter = filter.State.Trim().Split(',').Select(s => EnumConverExtension.GetValueInt<StateList>(s));

                query = query.Where(x => stateFilter.Contains(((int)x.State)));
            }
            if (filter.AssignedDate != default(DateTime))
            {
                query = query.Where(x =>x.AssignedDate.Date.CompareTo(filter.AssignedDate.Date) == 0);
            }


            switch (filter.OrderProperty)
            {
                case "AssetCode":
                    if(filter.Desc)
                        query = query.OrderByDescending(a => a.Asset.Code);
                    else
                        query = query.OrderBy(a => a.Asset.Code);
                    break;
                case "AssetName":
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


            var assignments = await query
                .PaginateAsync(filter.Page, filter.Limit);

            return new PagedResponseModel<AssignmentDto>
            {
                CurrentPage = assignments.CurrentPage,
                TotalPages = assignments.TotalPages,
                TotalItems = assignments.TotalItems,
                Items = _mapper.Map<IEnumerable<AssignmentDto>>(assignments.Items)
            };
        }


        public async Task AcceptRespond(Guid id)
        {
            var assignments = await _context.Assignments.FindAsync(id);

            assignments.State = StateList.Accepted;
            await _context.SaveChangesAsync();
        }
    }
}
