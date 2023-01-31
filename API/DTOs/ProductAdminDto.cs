using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProductAdminDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public float BuyPrice { get; set; }
        public float SellPrice { get; set; }
        public string ItemId { get; set; }
        public string Seller { get; set; }
        public float Profit { get; set; }
        public string Uploaded { get; set; }
        public string Url { get; set; }
        public string PhotoUrl { get; set; }
        public string Userid { get; set; }

    }
}