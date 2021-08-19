using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.Identity.DataAccessor.Migrations
{
    public partial class Add_PasswordChanged_Property_For_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PasswordChanged",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordChanged",
                table: "AspNetUsers");
        }
    }
}
