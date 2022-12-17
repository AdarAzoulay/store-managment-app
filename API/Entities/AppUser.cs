using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        // public int Id { get; set; } 
        // public string UserName { get; set; } 
        // public byte[] PasswordHash { get; set; }
        // public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Country { get; set; }
        public double AdditionalProfit { get; set; } = 1.18;

        public ICollection<Order> Orders { get; set; }
        public ICollection<Product> Products { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}