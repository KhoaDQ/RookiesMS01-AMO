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
        private readonly IUserService _userService;
        public AssignmentController(IAssignmentService assignmentService, IUserService userService)
        {
            _assignmentService = assignmentService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<AssignmentDto>> CreateAsync([FromBody] AssignmentRequest assignmentRequest)
        {
            Ensure.Any.IsNotNull(assignmentRequest, nameof(assignmentRequest));
            var assignedTo = Task.FromResult(_userService.GetByIdAsync(assignmentRequest.User_ID)).Result.Result.UserName;
            var assignedBy = Task.FromResult(_userService.GetByIdAsync(assignmentRequest.Admin_ID)).Result.Result.UserName;
            var assignment = await _assignmentService.AddAsync(assignmentRequest,assignedTo,assignedBy);
            return Created(Endpoints.Assignment, assignment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(Guid id, [FromBody] AssignmentUpdateRequest request)
        {
            Ensure.Any.IsNotNull(request, nameof(request));
            var assignedTo = Task.FromResult(_userService.GetByIdAsync(request.User_ID)).Result.Result.UserName;
            await _assignmentService.UpdateAsync(id,request,assignedTo);
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
