using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public DoctorsController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


       [AllowAnonymous]
       [HttpGet]
        public async Task<IActionResult> GetDoctors([FromQuery]UserParams userParams)
        {

              if (string.IsNullOrEmpty(userParams.Specialist))
            {
                userParams.Specialist = "Childneurology";
            }

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = "male";
            }
    	  
            var doctors = await _repo.GetDoctors(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(doctors);

            Response.AddPagination(doctors.CurrentPage, doctors.PageSize,
                 doctors.TotalCount, doctors.TotalPages);

            return Ok(usersToReturn);
        }
        [AllowAnonymous]    
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorBeforeReg(int id)
        {

            var doctor = await _repo.GetDoctor(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(doctor);

            return Ok(userToReturn);
        }


  }
}