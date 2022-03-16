using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Models
{
    [Table("Pet")]
    public class Pet
    {
        [Key]
        public int IDPet { get; set; }
        [MaxLength(50)]
        [Required]
        public string Type { get; set; }
        [MaxLength(50)]
        public string Age { get; set; }
        [MaxLength(50)]
        [Required]
        public string Color { get; set; }
        public string PetDetailedURL { get; set; }
        [MaxLength(50)]
        [Required] 
        public string PetName { get; set; }
        [MaxLength(150)] 
        public string Breed { get; set; } 
        [Required] 
        [MaxLength(2)] 
        public string Sex { get; set; }
        [MaxLength(50)]  
        public string Size { get; set; } 
         public float Price {get; set;}  
        [MaxLength(500)]
        public string Description {get; set;}       
        public string ImgURL {get;set;}

        [JsonIgnore]
        public Shelter Shelter {get;set;} 
    }
}
