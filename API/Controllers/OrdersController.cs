using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrdersController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        [HttpGet]
        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders
            // .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
            // .Include(x => x.Orders) 
            .ToListAsync();
        }

        [HttpGet("{username}")]
        public async Task<IEnumerable<MemberWithoutProductsDto>> GetUserOrdersAsync(string username)
        {
            return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<MemberWithoutProductsDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }

        public void Update(Order order)
        {
            _context.Entry<Order>(order).State = EntityState.Modified;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateOrder(OrderUpdateDto orderUpdateDto)
        {
            var order = await GetOrderByIdAsync(orderUpdateDto.Id);
            order.Address = orderUpdateDto.Address;
            order.BuyerUsername = orderUpdateDto.BuyerUsername;
            order.Status = orderUpdateDto.Status;
            _context.Update(order);
            if (await _context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }

            return BadRequest("Failed to update order");
        }
    }
}