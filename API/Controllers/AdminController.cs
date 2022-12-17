using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AdminController(UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        
        public async Task<ActionResult<PagedList<UserWithRolesDTO>>> GetUsersWithRoles([FromQuery]UserParams userParams)
        {
            var query = _userManager.Users.AsQueryable();
            query = query
            .Include(r => r.UserRoles)
            .ThenInclude(r => r.Role)
            .OrderBy(r => r.UserName);
            var users = await PagedList<UserWithRolesDTO>.CreateAsync(
            query.ProjectTo<UserWithRolesDTO>(_mapper.ConfigurationProvider).AsNoTracking(),
            userParams.PageNumber, userParams.PageSize);

            // var users = await _userManager.Users
            // .Include(r => r.UserRoles)
            // .ThenInclude(r => r.Role)
            // .OrderBy(r => r.UserName)
            // .Select(u => new
            // {
            //     u.Id,
            //     Username = u.UserName,
            //     Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
            // })
            // .ToListAsync();
                Response.AddPaginationHeader(
                users.CurrentPage, 
                users.PageSize, 
                users.TotalCount, 
                users.TotalPages);

            return Ok(users);
        }

        [Authorize(Policy = "ModerateDraftRole")]
        [HttpGet("drafts-to-moderate")]
        public ActionResult GetDradftsForModeration()
        {
            return Ok("Admins or moderators can see this");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(',').ToArray();
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound("Could not Find User");

            var userRoles = await _userManager.GetRolesAsync(user);

            //have ability only to add/remove roles

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
    }
}