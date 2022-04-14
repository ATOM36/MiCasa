using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiCasa.Migrations
{
    public partial class JwtIntegration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Comptes",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Comptes");
        }
    }
}
