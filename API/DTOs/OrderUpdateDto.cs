using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderUpdateDto
    {
        public int Id { get; set; }
        public string Status {get; set;}
        public string BuyerUsername { get; set; }
        public string Address { get; set; }


    }
}