using EnsureThat;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AMO.Business.Interfaces;
using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.AMO.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost]
        public async Task<ActionResult<RequestDto>> CreateAsync([FromBody] RequestAddRequest requestAddRequest)
        {
            Ensure.Any.IsNotNull(requestAddRequest, nameof(requestAddRequest));
            var  request = await _requestService.AddAsync(requestAddRequest);
            return Created(Endpoints.Request, request);
        }

        [HttpGet("find")]
        public async Task<PagedResponseModel<RequestDto>> FindAsync([FromQuery] FilterRequestsModel filterRequestsModel)
        {
            return await _requestService.PagedQueryAsync(filterRequestsModel);
        }

        [HttpPut("complete/{id}/{username}/{adminId}")]
        public async Task<ActionResult> CompleteAsync(Guid id, string username, Guid adminId)
        {
            await _requestService.CompleteAsync(id, username, adminId);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync([FromRoute] Guid id)
        {
            await _requestService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{assetId}")]
        public async Task<IEnumerable<RequestHistoryDto>> GetHistoryAsync([FromRoute] Guid assetId)
         => await _requestService.GetByIdAssetAsync(assetId);
    }
}
