using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class Add_ForeignKey_Request : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "Asset_ID",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Request",
                newName: "AssetID");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetId",
                table: "Request",
                newName: "IX_Request_AssetID");

            migrationBuilder.AlterColumn<Guid>(
                name: "AssetID",
                table: "Request",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

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
                name: "AssetID",
                table: "Request",
                newName: "AssetId");

            migrationBuilder.RenameIndex(
                name: "IX_Request_AssetID",
                table: "Request",
                newName: "IX_Request_AssetId");

            migrationBuilder.AlterColumn<Guid>(
                name: "AssetId",
                table: "Request",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "Asset_ID",
                table: "Request",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Asset_AssetId",
                table: "Request",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
