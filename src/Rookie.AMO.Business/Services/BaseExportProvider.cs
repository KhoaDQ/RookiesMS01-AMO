using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using Rookie.AMO.Business.Interfaces;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Rookie.AMO.Business.Services
{
    public abstract class BaseExportProvider : IExportProvider
    {
        protected string _sheetName;
        protected string _fileName;
        protected List<string> _headers;
        protected IList _type;
        protected IWorkbook _workbook;
        protected ISheet _sheet;
        private const string DefaultSheetName = "Sheet1";

        

        public byte[] Export<T>(List<T> exportData, string fileName, string sheetName)
        {
            _fileName = fileName;
            _sheetName = sheetName;

            _workbook = new XSSFWorkbook();
            _sheet = _workbook.CreateSheet(_sheetName);

            var headerStyle = _workbook.CreateCellStyle();
            var headerFont = _workbook.CreateFont();
            headerFont.IsBold = true;
            headerStyle.SetFont(headerFont);

            WriteData(exportData);

            var header = _sheet.CreateRow(0);
            for (var i = 0; i < _headers.Count; i++)
            {
                var cell = header.CreateCell(i);
                cell.SetCellValue(_headers[i]);
                cell.CellStyle = headerStyle;
            }

            using (var memoryStream = new MemoryStream())
            {
                _workbook.Write(memoryStream);

                return memoryStream.ToArray();
            }
        }

        public abstract void WriteData<T>(List<T> exportData);
    }
}