using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Orders")]
    public class Order
    {
        public int Id { get; set; }
        public DateTime DatePurchased { get; set; }
        public string BuyerUsername { get; set; }
        public int Qty { get; set; }
        public int DaysAwaitingShippment { get; set; }
        public string Status { get; set; }
        public float BuyPrice { get; set; }
        public float SellPrice { get; set; }
        public string Address { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}