﻿using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos.Assignment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Interfaces
{
    public interface IAssignmentService
    {
        Task<IEnumerable<AssignmentDto>> GetAllAsync();

        Task<PagedResponseModel<AssignmentDto>> PagedQueryAsync(FilterAssignmentsModel filter);

        Task<AssignmentDto> GetByIdAsync(Guid id);
        
        Task<IEnumerable<AssignmentDto>> GetByUserIdAsync(Guid userId);

        Task<AssignmentDto> AddAsync(AssignmentRequest assignmentRequest);

        Task DeleteAsync(Guid id);

        Task<AssignmentDto> UpdateAsync(Guid id, AssignmentUpdateRequest request);
    }
}
