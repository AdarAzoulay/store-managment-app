using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public bool IsUploaded { get; set; } = false;
        public string Title { get; set; }
        public string Brand { get; set; }
        public string ItemId { get; set; }
        public float BuyPrice { get; set; }
        public float SalePrice { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public string PhotoUrl { get; set; }
        public string Url { get; set; }
        public string ProductCategory { get; set; }
        public string DetailedDescription { get; set; }
    }
}