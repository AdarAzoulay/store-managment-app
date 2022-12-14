using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; } 
        public DateTime LastActive { get; set; } 
        public string Country { get; set; }
        public double AdditionalProfit { get; set; }

        public ICollection<OrderDto> Orders { get; set; }
        public ICollection<ProductDto> Products { get; set; }

    }
}