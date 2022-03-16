using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Shelter")]
    public class Shelter // azil
    {
        [Key]

        public int IDShelter { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(200)]
        [Required]
        public string Address { get; set; }
        [JsonIgnore]
        public List<Employee> Employees {get; set;}
        public List<Pet> Pets {get; set;}

    }
}