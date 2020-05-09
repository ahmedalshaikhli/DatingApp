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
    public class HospitalsController : ControllerBase
    {
        private readonly DataContext _context;
        public HospitalsController(DataContext context)
        {
            _context = context;
        }

        // GET api/hospital
        [AllowAnonymous]
       [HttpGet]
        public async Task<IActionResult> GetHospitals()
        {
            var hospitals = await _context.Hospitals.ToListAsync();

            return Ok(hospitals);
        }

        // GET api/hospital/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHospital(int id)
        {
            var hospital = await _context.Hospitals.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(hospital);
        }

        // POST api/hospitals
        [AllowAnonymous]
        [HttpPost]
        public async Task<Hospital> PostHospital( Hospital hospital)
        {
            await _context.Hospitals.AddAsync(hospital);
            await _context.SaveChangesAsync();

            return hospital;
        }

        // PUT api/hospitals/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/hospitals/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}