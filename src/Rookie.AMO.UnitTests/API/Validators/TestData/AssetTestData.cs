using Rookie.AMO.Contracts.Constants;
using Rookie.AMO.Contracts.Dtos.Asset;
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
        public static IEnumerable<object[]> InvalidIds()
        {
            return new object[][]
            {
                new object[]
                {
                    new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED"),
                    string.Format(ErrorTypes.Common.NumberGreaterThanError, nameof(AssetDto.Id),""),
                },
                new object[]
                {
                   new Guid("B41E8F49-DBCB-42C3-946F-F26C5B815BED"),
                    string.Format(ErrorTypes.Common.NumberGreaterThanError, nameof(AssetDto.Id),""),
                },
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
    }
}
