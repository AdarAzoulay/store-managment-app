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
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<ProductDto>> GetDraftsAsync()
        {
            return await _context.Products.Where(i => i.IsUploaded == false)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
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
            .Include(x=>x.Photos)
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }
        public async Task<ProductDto> GetSpesificDraftAsync(int id)
        {
            return await _context.Products
            .Where(x => x.Id == id)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
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

        public void AddDraft(Product product)
        {
            _context.Products.Add(product);
        }

        public void AddPhoto(Photo photo)
        {
            _context.Photos.Add(photo);
        }

        public async Task<bool> ProductExist(string productId)
        {
            return await _context.Products.AnyAsync(x => x.ItemId == productId.ToLower());
        }
    }
}