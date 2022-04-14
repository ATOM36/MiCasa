using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MiCasa.Migrations
{
    public partial class FirstSprint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Compte",
                columns: table => new
                {
                    CompteId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NumeroTelephone = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Mail = table.Column<string>(type: "text", nullable: false),
                    Nom = table.Column<string>(type: "text", nullable: false),
                    DateInscription = table.Column<string>(type: "text", nullable: false),
                    IsBlocked = table.Column<byte>(type: "smallint", nullable: false),
                    IsConnected = table.Column<byte>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compte", x => x.CompteId);
                });

            migrationBuilder.CreateTable(
                name: "ContratAgence",
                columns: table => new
                {
                    ContratId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DateCreation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<byte>(type: "smallint", nullable: false),
                    AgenceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContratAgence", x => x.ContratId);
                });

            migrationBuilder.CreateTable(
                name: "Administrateur",
                columns: table => new
                {
                    AdministrateurId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsActive = table.Column<byte>(type: "smallint", nullable: false),
                    CompteId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrateur", x => x.AdministrateurId);
                    table.ForeignKey(
                        name: "FK_Administrateur_Compte_CompteId",
                        column: x => x.CompteId,
                        principalTable: "Compte",
                        principalColumn: "CompteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agence",
                columns: table => new
                {
                    AgenceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Latitude = table.Column<float>(type: "real", nullable: false),
                    Longitude = table.Column<float>(type: "real", nullable: false),
                    Adresse = table.Column<string>(type: "text", nullable: false),
                    Signalement = table.Column<int>(type: "integer", nullable: false),
                    CompteId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agence", x => x.AgenceId);
                    table.ForeignKey(
                        name: "FK_Agence_Compte_CompteId",
                        column: x => x.CompteId,
                        principalTable: "Compte",
                        principalColumn: "CompteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Administrateur_CompteId",
                table: "Administrateur",
                column: "CompteId");

            migrationBuilder.CreateIndex(
                name: "IX_Agence_CompteId",
                table: "Agence",
                column: "CompteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrateur");

            migrationBuilder.DropTable(
                name: "Agence");

            migrationBuilder.DropTable(
                name: "ContratAgence");

            migrationBuilder.DropTable(
                name: "Compte");
        }
    }
}
