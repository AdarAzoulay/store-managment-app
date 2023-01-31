using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserWithRolesDTO
    {
        public string Username { get; set; }
        public string Userid { get; set; }
        public string Token { get; set; }
        public List<string> Roles {get;set;}

    }
}