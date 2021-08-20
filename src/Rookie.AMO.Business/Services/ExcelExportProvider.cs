using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text.RegularExpressions;

namespace Rookie.AMO.Business.Services
{
    public class ExcelExportProvider : BaseExportProvider
    {
        public ExcelExportProvider()
        {
            _headers = new List<string>();
            _type = new List<string>();
        }
        public override void WriteData<T>(List<T> exportData)
        {
        PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));

        DataTable table = new DataTable();

        foreach (PropertyDescriptor prop in properties)
        {
            var type = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
            _type.Add(type.Name);
            table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            string name = Regex.Replace(prop.Name, "([A-Z])", " $1").Trim();
            _headers.Add(name);
        }

        foreach (T item in exportData)
        {
            DataRow row = table.NewRow();
            foreach (PropertyDescriptor prop in properties)
                row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
            table.Rows.Add(row);
        }

        IRow sheetRow = null;

        for (int i = 0; i < table.Rows.Count; i++)
        {
            sheetRow = _sheet.CreateRow(i + 1);

            for (int j = 0; j < table.Columns.Count; j++)
            {
                ICell Row1 = sheetRow.CreateCell(j);
                string cellvalue = Convert.ToString(table.Rows[i][j]);

                if (string.IsNullOrWhiteSpace(cellvalue))
                {
                    Row1.SetCellValue(string.Empty);
                }
                else if (_type[j].ToString().ToLower() == "string")
                {
                    Row1.SetCellValue(cellvalue);
                }
                else if (_type[j].ToString().ToLower() == "int32")
                {
                    Row1.SetCellValue(Convert.ToInt32(table.Rows[i][j]));
                }
                else if (_type[j].ToString().ToLower() == "double")
                {
                    Row1.SetCellValue(Convert.ToDouble(table.Rows[i][j]));
                }
                else if (_type[j].ToString().ToLower() == "datetime")
                {
                    Row1.SetCellValue(Convert.ToDateTime
                        (table.Rows[i][j]).ToString("dd/MM/yyyy"));
                }
                else
                {
                    Row1.SetCellValue(string.Empty);
                }
            }
        }
    }
    }
}