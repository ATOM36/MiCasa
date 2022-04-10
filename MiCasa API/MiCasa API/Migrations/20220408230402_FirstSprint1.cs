using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiCasa.Migrations
{
    public partial class FirstSprint1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Administrateur_Compte_CompteId",
                table: "Administrateur");

            migrationBuilder.DropForeignKey(
                name: "FK_Agence_Compte_CompteId",
                table: "Agence");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Compte",
                table: "Compte");

            migrationBuilder.RenameTable(
                name: "Compte",
                newName: "Comptes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comptes",
                table: "Comptes",
                column: "CompteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Administrateur_Comptes_CompteId",
                table: "Administrateur",
                column: "CompteId",
                principalTable: "Comptes",
                principalColumn: "CompteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agence_Comptes_CompteId",
                table: "Agence",
                column: "CompteId",
                principalTable: "Comptes",
                principalColumn: "CompteId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Administrateur_Comptes_CompteId",
                table: "Administrateur");

            migrationBuilder.DropForeignKey(
                name: "FK_Agence_Comptes_CompteId",
                table: "Agence");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comptes",
                table: "Comptes");

            migrationBuilder.RenameTable(
                name: "Comptes",
                newName: "Compte");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Compte",
                table: "Compte",
                column: "CompteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Administrateur_Compte_CompteId",
                table: "Administrateur",
                column: "CompteId",
                principalTable: "Compte",
                principalColumn: "CompteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agence_Compte_CompteId",
                table: "Agence",
                column: "CompteId",
                principalTable: "Compte",
                principalColumn: "CompteId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
