using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PetController : ControllerBase
    {
        public ShelterContext Context {get;set;}
        public PetController(ShelterContext context)
        {
            Context=context;
        }

        
        [Route ("AddPet")]
        [HttpPost]
        public async Task<ActionResult> AddPet([FromBody]Pet pet)
        {
            if (string.IsNullOrWhiteSpace(pet.Type) || pet.Type.Length > 50)
                return BadRequest("Inappropriate animal type!");
            if (pet.Age.Length > 50)
                return BadRequest("Inappropriate age!");
            if (string.IsNullOrWhiteSpace(pet.Color) || pet.Color.Length > 50)
                return BadRequest("Inappropriate color!");
            if (string.IsNullOrWhiteSpace(pet.PetName) || pet.PetName.Length > 50)
                return BadRequest("Inappropriate name!");
            if (string.IsNullOrWhiteSpace(pet.Sex) || pet.Sex.Length > 2)
                return BadRequest("Inappropriate gender!"); 
            if (pet.Breed.Length > 150)
                return BadRequest("Inappropriate breed!");
            if (pet.Size.Length > 50)
                return BadRequest("Inappropriate size of animal!");
            if (pet.Description.Length > 500)
                return BadRequest("Description is too big!");    
            try{
                Context.Pets.Add(pet);
                await Context.SaveChangesAsync();
                return Ok($"Pet is added. ID = {pet.IDPet}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        
        [Route("ChangePet/{id}/{Type}/{Age}/{Color}/{PetUrlDesc}/{PetName}/{Sex}/{Breed}/{Size}/{Desc}/{ImgUrl}/{Price}")]
        [HttpPut]

        public async Task<ActionResult> Change (int id,string Type,string Age,string Color,string PetUrlDesc,string PetName,string Sex,string Breed,string Size,string Desc,string ImgUrl,float Price)
        {
             if (string.IsNullOrWhiteSpace(Type) || Type.Length > 50)
                return BadRequest("Inappropriate animal type!");
            if (Age.Length > 50)
                return BadRequest("Inappropriate age!");
            if (string.IsNullOrWhiteSpace(Color) || Color.Length > 50)
                return BadRequest("Inappropriate color!");
            if (string.IsNullOrWhiteSpace(PetName) || PetName.Length > 50)
                return BadRequest("Inappropriate name!");
            if (string.IsNullOrWhiteSpace(Sex) || Sex.Length > 2)
                return BadRequest("Inappropriate gender!"); 
            if (Breed.Length > 150)
                return BadRequest("Inappropriate breed!");
            if (Size.Length > 50)
                return BadRequest("Inappropriate size of animal!");
            if (Desc.Length > 500)
                return BadRequest("Description is too big!");  
                var pet = await Context.Pets.FirstOrDefaultAsync(p=> p.IDPet == id);
                pet.Type = Type;
                pet.Age = Age;
                pet.Color=Color;
                pet.PetDetailedURL=PetUrlDesc;
                pet.PetName=PetName;
                pet.Breed=Breed;
                pet.Sex=Sex;
                pet.Size=Size;
                pet.Description=Desc;
                pet.ImgURL=ImgUrl;
                pet.Price=Price;
                pet.Shelter=pet.Shelter;
                try{
                Context.Pets.Update(pet);
                await Context.SaveChangesAsync();
                return Ok(pet);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
        [Route("GetPet/{petid}")]
        [HttpGet]
        public async Task<ActionResult> GetPet(int petid)
        {
            if(petid<0)
                return BadRequest("Inappropiate id");
             try
            {
                var pets = Context.Pets.Include(p => p.Shelter); 
                var pet = await pets.Where(p => (p.IDPet == petid)).ToListAsync();
                 return Ok(pet);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

         [Route("DeletePet/{petid}")]
        [HttpDelete]
          public async Task<ActionResult> Delete(int petid)
        {
           if(petid<0)
                return BadRequest("Inappropiate id");
            try
            {
               
                if ((await Context.Pets.FindAsync(petid)) == null)
                    return BadRequest($"Pet with ID = {petid} doesn't exist.");
                var pet = await Context.Pets.FindAsync(petid);
                Context.Pets.Remove(pet);
                await Context.SaveChangesAsync();
                 return Ok($"Pet with ID = {pet.IDPet} is deleted.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}
