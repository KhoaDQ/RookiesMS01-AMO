using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rookie.AMO.DataAccessor.Migrations
{
    public partial class NewMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Category_CategoryId1",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_CategoryId1",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Asset");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "Asset",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_CategoryId",
                table: "Asset",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Category_CategoryId",
                table: "Asset",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Category_CategoryId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_CategoryId",
                table: "Asset");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryId",
                table: "Asset",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId1",
                table: "Asset",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_CategoryId1",
                table: "Asset",
                column: "CategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Category_CategoryId1",
                table: "Asset",
                column: "CategoryId1",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
