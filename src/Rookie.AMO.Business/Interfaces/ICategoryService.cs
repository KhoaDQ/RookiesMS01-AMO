using Rookie.AMO.Contracts;
using Rookie.AMO.Contracts.Dtos;
using Rookie.AMO.Contracts.Dtos.Category;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.AMO.Business.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();


        Task<CategoryDto> GetByIdAsync(Guid id);


        Task<CategoryDto> AddAsync(CategoryRequest categoryRequest);

        Task DeleteAsync(Guid id);

        Task UpdateAsync(CategoryDto categoryDto);
    }
}
