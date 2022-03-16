using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShelterController : ControllerBase
    {
        public ShelterContext Context {get;set;}
        public ShelterController(ShelterContext context)
        {
            Context=context;
        }

    [Route("AddShelter/{Name}/{Address}")]
    [HttpPost]
       public async Task<ActionResult> AddShelter(string Name,string Address)
       {
             var sh = await Context.Shelters.FirstOrDefaultAsync(s=> s.Address == Address);
             if (sh != null)
             return BadRequest("Duplicate shelter!");
           try{
                if (string.IsNullOrWhiteSpace(Name) || Name.Length > 100)
                    return BadRequest("Inappropiate name!");
                if (string.IsNullOrWhiteSpace(Address) || Address.Length > 200)
                    return BadRequest("Inappropiate address!");
                Shelter shelter = new Shelter();
                shelter.Name=Name;
                shelter.Address=Address;
                shelter.Employees = null;
                shelter.Pets = null;    
                Context.Shelters.Add(shelter);
                await Context.SaveChangesAsync();
                return Ok(shelter);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
       }

        [Route("ChangeShelter/{shelterID}")]
        [HttpPut]
         public async Task<ActionResult> Change (int shelterID,string Name,string Address)
         {
              if ((await Context.Shelters.FindAsync(shelterID)) == null)
                    return BadRequest($"Shelter with ID = {shelterID} doesn't exist.");
              if (shelterID < 0)
                    return BadRequest("Inappropiate id!");
                if (string.IsNullOrWhiteSpace(Name) || Name.Length > 100)
                    return BadRequest("Inappropiate name!");
                if (string.IsNullOrWhiteSpace(Address) || Address.Length > 200)
                    return BadRequest("Inappropiate address!");
            try{
                var sh = await Context.Shelters.FindAsync(shelterID);
                sh.Name=Name;
                sh.Address = Address;
               Context.Shelters.Update(sh);
                await Context.SaveChangesAsync();
                return Ok($"Shelter is changed. ID = {sh.IDShelter}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
         }
        [Route("AddPet/{shelterID}/{Type}/{Age}/{Color}/{PetUrlDesc}/{PetName}/{Sex}/{Breed}/{Size}/{Desc}/{ImgUrl}/{Price}")]
        [HttpPut]
        public async Task<ActionResult> AddPetToShelter (int shelterID,string Type,string Age,string Color,string PetUrlDesc,string PetName,string Sex,string Breed,string Size,string Desc,string ImgUrl,float Price)
         {
            if (shelterID < 0)
                    return BadRequest("Inappropiate id!");
            Shelter shelter = await Context.Shelters
                                                    .Include(s=> s.Pets)
                                                    .Include(s=> s.Employees)
                                                    .FirstOrDefaultAsync( s=> s.IDShelter == shelterID);
            if (shelter == null)
                    return BadRequest("There is no shelter with ID = " + shelterID);
            Pet pet = new Pet();
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
            if (await Context.Pets.FirstOrDefaultAsync(pet=> pet.ImgURL == ImgUrl)!=null)
                return BadRequest("There is already that pet in database!"); 
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
            shelter.Pets.Add(pet);
            try{
                Context.Shelters.Update(shelter);
                await Context.SaveChangesAsync();
                return Ok(pet);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
         }

        [Route("AddEmployee/{shelterID}/{fullname}/{username}/{password}")]
        [HttpPut]
        public async Task<ActionResult> AddEmployeeToShelter (int shelterID,string fullname,string username,string password)
         {
            if (shelterID < 0 )
                    return BadRequest("Inappropiate id!");
             Shelter shelter = await Context.Shelters
                                                    .Include(s=> s.Pets)
                                                    .Include(s=> s.Employees)
                                                    .FirstOrDefaultAsync( s=> s.IDShelter == shelterID);
            if (shelter == null)
                    return BadRequest("There is no shelter with ID = " + shelterID);
            Employee employee = new Employee();
            if (string.IsNullOrWhiteSpace(fullname) && fullname.Length >100)
                return BadRequest("Inappropiate Full Name");
            if (string.IsNullOrWhiteSpace(fullname) && fullname.Length >100)
                return BadRequest("Inappropiate Username");
            if (string.IsNullOrWhiteSpace(fullname) && fullname.Length >100)
                return BadRequest("Inappropiate Password");  
            if (await Context.Employees.FirstOrDefaultAsync(employee => employee.Username == username) !=null)
                return BadRequest("Username is already taken!");  
            employee.FullName=fullname;
            employee.Username=username;
            employee.Password=password;
            try{
                shelter.Employees.Add(employee);
                Context.Shelters.Update(shelter);
                await Context.SaveChangesAsync();
                return Ok(
                     new
                {
                    IDEmployee=employee.IDEmployee,
                    FullName=employee.FullName,
                    Username=employee.Username,
                    Password=employee.Password,
                    ShelterID = employee.Shelter.IDShelter,
                    ShelterName = employee.Shelter.Name
                });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
         }

        [Route("GetShelter/{shelterID}")]
        [HttpGet]
        public async Task<ActionResult> GetShelter(int shelterID)
        {
             if (shelterID < 0)
                    return BadRequest("Inappropiate id!");
            Shelter shelter = null;
            shelter = await Context.Shelters.FindAsync(shelterID);
            if (shelter == null)
                    return BadRequest("There is no shelter with ID = " + shelterID);
             try
            {
                Shelter shelter1 =  await Context.Shelters.Include(s => s.Employees)
                                                .Include(s => s.Pets)
                                                .FirstOrDefaultAsync( s=> s.IDShelter == shelterID);
                return Ok(shelter1);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("GetShelter/{shelterID}/{type}")]
        [HttpGet]
        public async Task<ActionResult> GetShelter(int shelterID,string type)
        {
             if (shelterID < 0)
                    return BadRequest("Inappropiate id!");
            var shelter = await Context.Shelters.Include(s=>s.Pets).FirstOrDefaultAsync(s=> s.IDShelter==shelterID);
            if (shelter == null)
                    return BadRequest("There is no shelter with ID = " + shelterID);
            var petsList = new List<Pet>();
            shelter.Pets.ForEach(p=> {
                if(p.Type == type)
                    petsList.Add(p);
            });
             try
            {
                return Ok(petsList);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("GetShelters")]
        [HttpGet]
        public async Task<ActionResult> GetShelters()
        {
            
            var shelter = await Context.Shelters.ToListAsync();
            if (shelter == null)
                    return BadRequest("There is no any shelters");
             try
            {
                return Ok(
                    shelter.Select(s=> new
                {
                    IDShelter =s.IDShelter,
                    Name = s.Name,
                    Address=s.Address
                }).ToList()
                );
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    
     [Route("DeleteShelter/{shelterID}")]
        [HttpDelete]
          public async Task<ActionResult> Delete(int shelterID)
        {
            if (shelterID < 0)
                return BadRequest("Inappropriate id!");
            try
            {
               
                if ((await Context.Shelters.FindAsync(shelterID)) == null)
                    return BadRequest("There is no shelter with ID = " + shelterID);
                Shelter shelter =  await Context.Shelters.Include(s => s.Employees)
                                                .Include(s => s.Pets)
                                                .FirstOrDefaultAsync( s=> s.IDShelter == shelterID);
                shelter.Employees.ForEach(el=> Context.Employees.Remove(el));
                shelter.Pets.ForEach(el=> Context.Pets.Remove(el));
                Context.Shelters.Remove(shelter);
                await Context.SaveChangesAsync();
                 return Ok($"Shelter with ID = {shelterID} is deleted.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}