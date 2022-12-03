using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(
        this HttpResponse response,
        int currentPage,
        int itemsPerPage,
        int totalItems,
        int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            response.Headers.Add("Pagination",JsonSerializer.Serialize(paginationHeader,options));
            //  * Access-Control-Expose-Headers is a special header that allows us to expose the header to the client
            //  * this is part of the HTTP protocol
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}