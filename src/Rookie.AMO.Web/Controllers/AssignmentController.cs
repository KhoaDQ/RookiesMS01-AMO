using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Assignment;
using Rookie.AMO.Web.DataProviders;

namespace Rookie.AMO.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase 
    {
        private readonly IAssignmentService _assignmentService;
        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost]
        public async Task<ActionResult<AssignmentDto>> CreateAsync([FromBody] AssignmentRequest assignmentRequest)
        {
            Ensure.Any.IsNotNull(assignmentRequest, nameof(assignmentRequest));
            var assignment = await _assignmentService.AddAsync(assignmentRequest);
            return Created(Endpoints.Assignment, assignment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(Guid id, [FromBody] AssignmentUpdateRequest request)
        {
            Ensure.Any.IsNotNull(request, nameof(request));
            await _assignmentService.UpdateAsync(id,request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAssignmentAsync([FromRoute] Guid id)
        {
            var assignmentDto = await _assignmentService.GetByIdAsync(id);
            Ensure.Any.IsNotNull(assignmentDto, nameof(assignmentDto));
            await _assignmentService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<AssignmentDto> GetByIdAsync(Guid id)
            => await _assignmentService.GetByIdAsync(id);

        [HttpGet("user/{id}")]
        public async Task<IEnumerable<AssignmentDto>> GetByUserIdAsync(Guid userId)
            => await _assignmentService.GetByUserIdAsync(userId);

        [HttpGet]
        public async Task<IEnumerable<AssignmentDto>> GetAsync()
            => await _assignmentService.GetAllAsync();


        [HttpGet("find")]
        public async Task<PagedResponseModel<AssignmentDto>> FindAsync([FromQuery] FilterAssignmentsModel filterAssignmentsModel)
        {
            return await _assignmentService.PagedQueryAsync(filterAssignmentsModel);
        }
    }
}
