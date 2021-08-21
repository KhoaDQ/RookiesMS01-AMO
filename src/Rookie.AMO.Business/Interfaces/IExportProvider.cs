using System.Collections.Generic;

namespace Rookie.AMO.Business.Interfaces
{
    public interface IExportProvider
    {
        byte[] Export<T>(List<T> exportData, string fileName, string sheetName);
    }
}