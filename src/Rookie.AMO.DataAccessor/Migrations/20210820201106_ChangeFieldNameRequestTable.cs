using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class ChangeFieldNameRequestTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Request",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Request",
                newName: "AssetID");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "Request",
                newName: "AdminID");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetId",
                table: "Request",
                newName: "IX_Request_AssetID");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Asset_AssetID",
                table: "Request",
                column: "AssetID",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Asset_AssetID",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Request",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "AssetID",
                table: "Request",
                newName: "AssetId");

            migrationBuilder.RenameColumn(
                name: "AdminID",
                table: "Request",
                newName: "AdminId");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetID",
                table: "Request",
                newName: "IX_Request_AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
