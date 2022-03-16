using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int IDEmployee {get;set;}
        [Required]
        [MaxLength(100)]
        public string FullName {get;set;}
        [Required]
        [MaxLength(100)]
        public string Username {get;set;}    
        [Required]
        [MaxLength(100)]
        public string Password {get;set;}     

        public Shelter Shelter {get;set;} 
    }
}