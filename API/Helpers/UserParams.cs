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
    }
}