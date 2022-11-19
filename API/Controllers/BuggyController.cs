using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize] // 401 unauthorized
        [HttpGet("auth")] // buggy/auth
        public ActionResult<string> GetSecret()
        {
            return "401 unauthorized";
        }

        [HttpGet("not-found")] // buggy/not-found
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null)
            {
                return NotFound();// 404 not found
            }
            return Ok();
        }

        [HttpGet("server-error")] // buggy/server-error
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingtoReturn = thing.ToString(); //NullReferenceExaption
            return thingtoReturn;
        }

        [HttpGet("bad-request")] // buggy/bad-request
        public ActionResult<string> GetBetRequest()
        {
            return BadRequest("bad-request");
        }
    }
}