using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
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
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders =  await _orderRepository.GetOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var rtn = await _orderRepository.GetSpesificOrderAsync(id);
            return rtn;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetMemberOrders(string username)
        {
            var rtn = await _orderRepository.OrdersByUsernameAsync(username);
            return Ok(rtn);
        }

        // [HttpPut]
        // public async Task<ActionResult> UpdateOrder(OrderUpdateDto orderUpdateDto)
        // {
        //     var order = await GetOrderByIdAsync(orderUpdateDto.Id);
        //     order.Address = orderUpdateDto.Address;
        //     order.BuyerUsername = orderUpdateDto.BuyerUsername;
        //     order.Status = orderUpdateDto.Status;
        //     _context.Update(order);
        //     if (await _context.SaveChangesAsync() > 0)
        //     {
        //         return NoContent();
        //     }

        //     return BadRequest("Failed to update order");
        // }
    }
}