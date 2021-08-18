using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class AddNameUserAssignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedBy",
                table: "Assignment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedTo",
                table: "Assignment",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedBy",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "AssignedTo",
                table: "Assignment");
        }
    }
}
