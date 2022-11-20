using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedOrders
    {
        public static async Task SeedOrder(DataContext context)
        {
            if (await context.Orders.AnyAsync()) return;

            var orderData = await System.IO.File.ReadAllTextAsync("Data/OrdersSeedData.json");

            var orders = JsonSerializer.Deserialize<List<Order>>(orderData);

            foreach (var order in orders)
            {
                order.AppUserId = 1; //Adding to user 1
                context.Orders.Add(order);
            }

            await context.SaveChangesAsync(); 
        }
    }
}