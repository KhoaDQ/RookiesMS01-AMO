using Rookie.AMO.DataAccessor.Entities;

namespace Rookie.AMO.IntegrationTests.TestData
{
    public static class ArrangeData
    {
        public static Category Category() => new()
        {
            Name = "LA",
        };
    }
}