using System;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DatePurchased { get; set; }
        public string BuyerUsername { get; set; }
        public int Qty { get; set; }
        public int DaysAwaitingShippment { get; set; }
        public string Status { get; set; }
        public float BuyPrice { get; set; }
        public float SellPrice { get; set; }
        public string Address { get; set; }

    }
}