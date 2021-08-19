using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class ChangeRequiredFieldInTableRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Asset_AssetID",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "AcceptedDate",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "AssetID",
                table: "Request",
                newName: "AssetId");

            migrationBuilder.RenameColumn(
                name: "User_ID",
                table: "Request",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Admin_ID",
                table: "Request",
                newName: "AdminId");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetID",
                table: "Request",
                newName: "IX_Request_AssetId");

            migrationBuilder.AlterColumn<string>(
                name: "RequestedBy",
                table: "Request",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Request",
                newName: "AssetID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Request",
                newName: "User_ID");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "Request",
                newName: "Admin_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetId",
                table: "Request",
                newName: "IX_Request_AssetID");

            migrationBuilder.AlterColumn<string>(
                name: "RequestedBy",
                table: "Request",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "AcceptedDate",
                table: "Request",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Asset_AssetID",
                table: "Request",
                column: "AssetID",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
