using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<Product>> GetDraftsAsync()
        {
            return await _context.Products.Where(i => i.IsUploaded == false)
            .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.Where(i => i.IsUploaded == true)
            .ToListAsync();
        }

        public Task<IEnumerable<ProductDto>> DraftsByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }


        public async Task<Product> GetSpesificProductAsync(int id)
        {
            return await _context.Products
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }

        public Task<IEnumerable<ProductDto>> ProductsByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry<Product>(product).State = EntityState.Modified;
        }

        public void DeleteDraft(Product product)
        {
            _context.Products.Remove(product);
        }
    }
}