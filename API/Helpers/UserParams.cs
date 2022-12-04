using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10; // default page size
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = Math.Min(MaxPageSize, value);
        }

        public int MinBuyPrice { get; set; } = 0;
        public int MaxBuyPrice { get; set; } = int.MaxValue;
        public int MinSellPrice { get; set; } = 0;
        public int MaxSellPrice { get; set; } = int.MaxValue;
        public int MinProfit { get; set; } = 0;
        public int MaxProfit { get; set; } = int.MaxValue;
        public int SoldCount { get; set; } = 0;

        public string OrderBy { get; set; } = "uploaded";
    }
}