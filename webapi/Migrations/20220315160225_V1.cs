using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shelter",
                columns: table => new
                {
                    IDShelter = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shelter", x => x.IDShelter);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    IDEmployee = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ShelterIDShelter = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.IDEmployee);
                    table.ForeignKey(
                        name: "FK_Employees_Shelter_ShelterIDShelter",
                        column: x => x.ShelterIDShelter,
                        principalTable: "Shelter",
                        principalColumn: "IDShelter",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pet",
                columns: table => new
                {
                    IDPet = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Age = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PetDetailedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PetName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Breed = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Sex = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Size = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ImgURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShelterIDShelter = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pet", x => x.IDPet);
                    table.ForeignKey(
                        name: "FK_Pet_Shelter_ShelterIDShelter",
                        column: x => x.ShelterIDShelter,
                        principalTable: "Shelter",
                        principalColumn: "IDShelter",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ShelterIDShelter",
                table: "Employees",
                column: "ShelterIDShelter");

            migrationBuilder.CreateIndex(
                name: "IX_Pet_ShelterIDShelter",
                table: "Pet",
                column: "ShelterIDShelter");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Pet");

            migrationBuilder.DropTable(
                name: "Shelter");
        }
    }
}
