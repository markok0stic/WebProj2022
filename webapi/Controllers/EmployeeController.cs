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
    public class EmployeeController : ControllerBase
    {
        public ShelterContext Context {get;set;}
        public EmployeeController(ShelterContext context)
        {
            Context=context;
        }
         [Route("GetEmployees")]
        [HttpGet]
        public async Task<ActionResult> GetEmployees()
        {
 
                var employees =  await Context.Employees.Include(e=>e.Shelter).ToListAsync();
                if (employees == null)
                    return BadRequest($"There is no employees!");
            try
            {
                
                return Ok(
                    employees.Select(e=> new
                {
                    IDEmployee=e.IDEmployee,
                    FullName=e.FullName,
                    Username=e.Username,
                    Password=e.Password,
                    ShelterID = e.Shelter.IDShelter,
                    ShelterName = e.Shelter.Name
                }).ToList()
                );
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("GetEmployee/{username}/{password}")]
        [HttpGet]
        public async Task<ActionResult> GetEmployeeByUserPass(string username,string password)
        {
                var e =  await Context.Employees.Include(e=>e.Shelter).FirstOrDefaultAsync(emp => emp.Username == username && emp.Password == password);
                if (e == null)
                    return BadRequest($"Invalid credit!");
            try
            {
                return Ok(
                     new
                {
                    IDEmployee=e.IDEmployee,
                    FullName=e.FullName,
                    Username=e.Username,
                    Password=e.Password,
                    ShelterID = e.Shelter.IDShelter,
                    ShelterName = e.Shelter.Name
                });
            }
            catch(Exception er){
                return BadRequest(er.Message);
            }
        }

        [Route("GetEmployee/{employeeid}")]
        [HttpGet]
        public async Task<ActionResult> GetEmployee(int employeeid)
        {
            if (employeeid < 0)
                return BadRequest("Id is null or whitespace");
             try
            {
                var employees =  Context.Employees.Include(e=> e.Shelter);
                var employee = await employees.Where( e=> (e.IDEmployee == employeeid)).ToListAsync();
                if (employee == null)
                    return BadRequest($"Employee with ID = {employeeid} doesn't exist.");
                return Ok(employee);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteEmployee/{employeeid}")]
        [HttpDelete]

        public async Task<ActionResult> Delete(int employeeid)
        {
           if (employeeid <0)
               return BadRequest("Id is null or whitespace");
            try
            {
                if ((await Context.Employees.FindAsync(employeeid)) == null)
                    return BadRequest($"Employee with ID = {employeeid} doesn't exist.");
                var emp = await Context.Employees.FindAsync(employeeid);
                Context.Employees.Remove(emp);
                await Context.SaveChangesAsync();
                 return Ok($"Employee with ID = {emp.IDEmployee} is deleted.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    }
}
