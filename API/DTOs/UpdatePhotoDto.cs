using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdatePhotoDto
    {
        public int ProductId { get; set; }
        public int PhotoId { get; set; }
    }
}