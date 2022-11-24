using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders
            // .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
            .ToListAsync();        
        }

        public async Task<OrderDto> GetSpesificOrderAsync(int id)
        {
            return await _context.Orders
            .Where(x => x.Id == id)
            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<OrderDto>> OrdersByUsernameAsync(string username)
        {
            var user = await _context.Users
            .SingleOrDefaultAsync(x => x.UserName == username);

            var orders =  _context.Orders.AsQueryable();

            orders = orders.Where(order=>order.AppUserId==user.Id);

            return await orders
            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
            .ToListAsync();  
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Order order)
        {
            _context.Entry<Order>(order).State = EntityState.Modified;
        }
    }
}