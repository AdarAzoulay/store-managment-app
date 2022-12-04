using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }
        public bool IsUploaded { get; set; } = false;
        public string Title { get; set; }
        public string Brand { get; set; }
        public float BuyPrice { get; set; }
        public string ItemId { get; set; }
        public float SellPrice { get; set; }
        public string Seller { get; set; }
        public int QuantitySold { get; set; }
        public float Profit { get; set; } 
        public string Uploaded {get;set;}
        public ICollection<Photo> Photos { get; set; }
        public string Url { get; set; }
        public string ProductCategory { get; set; }
        public string DetailedDescription { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}