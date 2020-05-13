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
    public class PharmaciesController : ControllerBase
    {
        private readonly DataContext _context;
        public PharmaciesController(DataContext context)
        {
            _context = context;
        }

        // GET api/Pharmacies
        [AllowAnonymous]
       [HttpGet]
        public async Task<IActionResult> GetPharmacies()
        {
            var pharmacies = await _context.Pharmacies.ToListAsync();

            return Ok(pharmacies);
        }

        // GET api/pharmacy/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPharmacy(int id)
        {
            var pharmacy = await _context.Pharmacies.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(pharmacy);
        }

        // POST api/pharmacy
        [AllowAnonymous]
        [HttpPost]
        public async Task<Pharmacy> PostPharmacy( Pharmacy pharmacy)
        {
            await _context.Pharmacies.AddAsync(pharmacy);
            await _context.SaveChangesAsync();

            return pharmacy;
        }

        // PUT api/pharmacy/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/pharmacy/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}