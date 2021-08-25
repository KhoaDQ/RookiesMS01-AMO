using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Asset;
using Rookie.AMO.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AMO.UnitTests.API.Validators.TestData
{
   public class AssetTestData
    {
        public static IEnumerable<object[]> ValidTexts()
        {
            return new object[][]
            {
                new object[] { "Mac Pro 2021" },
                new object[] { "MAC PRO 2021" },
            };
        }

        public static IEnumerable<object[]> ValidIds()
        {
            return new object[][]
            {
                new object[] { new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED") },
                new object[] { new Guid("4cb7a099-94e7-4e23-a4cb-535e15b21330") },
            };
        }
        
        public static IEnumerable<object[]> InvalidCodes()
        {
            return new object[][]
            {
                new object[]
                {
                    null,
                    string.Format(ErrorTypes.Common.RequiredError, nameof(AssetDto.Code)),
                },
                new object[] {
                    null,
                    string.Format(ErrorTypes.Common.RequiredError, nameof(AssetDto.Code)),
                },
            };
        }
        public static List<Category> GetCategories()
        {
            return new List<Category>()
            {
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "Laptop",
                    Code = "LA"
                },
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "Monitor",
                    Code = "MO"
                },
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "Personal Computer",
                    Code = "PC"
                }
            };
        }

    }
}
