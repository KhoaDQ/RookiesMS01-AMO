using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class ModifyColumnAssignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "User_ID",
                table: "Assignment",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "Admin_ID",
                table: "Assignment",
                newName: "AdminID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Assignment",
                newName: "User_ID");

            migrationBuilder.RenameColumn(
                name: "AdminID",
                table: "Assignment",
                newName: "Admin_ID");
        }
    }
}
