
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaboratoriesController : ControllerBase
    {
        private readonly DataContext _context;
        public LaboratoriesController(DataContext context)
        {
            _context = context;
        }

        // GET api/Laboratories
        [AllowAnonymous]
       [HttpGet]
        public async Task<IActionResult> GetLaboratories()
        {
            var laboratories = await _context.Laboratories.ToListAsync();

            return Ok(laboratories);
        }

        // GET api/laboratory/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHospital(int id)
        {
            var laboratory = await _context.Laboratories.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(laboratory);
        }

        // POST api/laboratories
        [AllowAnonymous]
        [HttpPost]
        public async Task<Laboratory> PostLaboratory( Laboratory laboratory)
        {
            await _context.Laboratories.AddAsync(laboratory);
            await _context.SaveChangesAsync();

            return laboratory;
        }

        // PUT api/Laboratory/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Laboratory/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}