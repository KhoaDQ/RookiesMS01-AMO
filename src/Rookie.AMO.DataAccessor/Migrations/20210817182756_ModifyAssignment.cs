using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class ModifyAssignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignment_Asset_AssetId",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "Asset_ID",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Assignment");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Assignment");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Assignment",
                newName: "AssetID");

            migrationBuilder.RenameIndex(
                name: "IX_Assignment_AssetId",
                table: "Assignment",
                newName: "IX_Assignment_AssetID");

            migrationBuilder.AlterColumn<Guid>(
                name: "AssetID",
                table: "Assignment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assignment_Asset_AssetID",
                table: "Assignment",
                column: "AssetID",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignment_Asset_AssetID",
                table: "Assignment");

            migrationBuilder.RenameColumn(
                name: "AssetID",
                table: "Assignment",
                newName: "AssetId");

            migrationBuilder.RenameIndex(
                name: "IX_Assignment_AssetID",
                table: "Assignment",
                newName: "IX_Assignment_AssetId");

            migrationBuilder.AlterColumn<Guid>(
                name: "AssetId",
                table: "Assignment",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "Asset_ID",
                table: "Assignment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Assignment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "Assignment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Assignment",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Assignment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Assignment_Asset_AssetId",
                table: "Assignment",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
