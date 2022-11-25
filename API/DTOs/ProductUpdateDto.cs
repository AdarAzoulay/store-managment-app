using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }
        public bool IsUploaded { get; set; }
        public string Title { get; set; }
        public string Brand { get; set; }
        public float BuyPrice { get; set; }
        // public ICollection<PhotoDto> Photos { get; set; }
        // public string Url { get; set; }
        public string ProductCategory { get; set; }
        public string DetailedDescription { get; set; }
    }
}