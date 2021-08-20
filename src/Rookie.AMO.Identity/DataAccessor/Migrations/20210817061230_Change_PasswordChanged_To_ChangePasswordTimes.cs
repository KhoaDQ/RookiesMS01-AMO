using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.Identity.DataAccessor.Migrations
{
    public partial class Change_PasswordChanged_To_ChangePasswordTimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordChanged",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ChangePasswordTimes",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChangePasswordTimes",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "PasswordChanged",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
