using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<PagedList<ProductDto>> GetDraftsAsync(UserParams userParams)
        {
            var query = _context.Products.AsQueryable();
            query = query.Where(i => i.IsUploaded == false);

            return await PagedList<ProductDto>.CreateAsync(
            query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(),
            userParams.PageNumber, userParams.PageSize);

        }

        public async Task<PagedList<ProductAdminDto>> GetProductsAsync(UserParams userParams)
        {
            var query = _context.Products.AsQueryable();
            query = query.Where(i => i.IsUploaded == true);

            query = query.Where(i => i.BuyPrice >= userParams.MinBuyPrice && i.BuyPrice <= userParams.MaxBuyPrice);
            query = query.Where(i => i.SellPrice >= userParams.MinSellPrice && i.SellPrice <= userParams.MaxSellPrice);
            query = query.Where(i => i.Profit >= userParams.MinProfit && i.Profit <= userParams.MaxProfit);
            query = query.Where(i => userParams.SoldCount >= 0);

            query = userParams.OrderBy switch
            {
                "buyPriceDes" => query.OrderByDescending(u => u.BuyPrice),
                "buyPriceAsc" => query.OrderBy(u => u.BuyPrice),
                "uploadedAsc" => query.OrderBy(u => u.Uploaded),
                _ => query.OrderByDescending(u => u.Uploaded),
            };

            return await PagedList<ProductAdminDto>.CreateAsync(
            query.ProjectTo<ProductAdminDto>(_mapper.ConfigurationProvider).AsNoTracking(),
            userParams.PageNumber, userParams.PageSize);

        }

        public async Task<PagedList<ProductDto>> DraftstsByCurrentUser(UserParams userParams)
        {
            var id = int.Parse(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value);
            var query = _context.Products.Where(i => i.AppUserId == id).AsQueryable();

            query = query.Where(i => i.IsUploaded == false);

            return await PagedList<ProductDto>.CreateAsync(
            query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(),
            userParams.PageNumber, userParams.PageSize);

        }
        public async Task<PagedList<ProductDto>> ProductsByCurrentUser(UserParams userParams)
        {
            var id = int.Parse(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value);
            var query = _context.Products.Where(i => i.AppUserId == id).AsQueryable();
            query = query.Where(i => i.IsUploaded == true);

            query = query.Where(i => i.BuyPrice >= userParams.MinBuyPrice && i.BuyPrice <= userParams.MaxBuyPrice);
            query = query.Where(i => i.SellPrice >= userParams.MinSellPrice && i.SellPrice <= userParams.MaxSellPrice);
            query = query.Where(i => i.Profit >= userParams.MinProfit && i.Profit <= userParams.MaxProfit);
            query = query.Where(i => userParams.SoldCount >= 0);

            query = userParams.OrderBy switch
            {
                "buyPriceDes" => query.OrderByDescending(u => u.BuyPrice),
                "buyPriceAsc" => query.OrderBy(u => u.BuyPrice),
                "uploadedAsc" => query.OrderBy(u => u.Uploaded),
                _ => query.OrderByDescending(u => u.Uploaded),
            };

            return await PagedList<ProductDto>.CreateAsync(
            query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(),
            userParams.PageNumber, userParams.PageSize);

        }


        public async Task<Product> GetSpesificProductAsync(int id)
        {
            return await _context.Products
            .Include(x => x.Photos)
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        }

        public async Task<ProductDto> GetSpesificProductDtoAsync(int id)
        {
            return await _context.Products
            .Include(x => x.Photos)
            .Where(x => x.Id == id)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<ProductDto> GetSpesificDraftAsync(int id)
        {
            return await _context.Products
            .Where(x => x.Id == id)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<bool> BelongToUser(int productId)
        {
            var UserId = int.Parse(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value);
            return await _context.Products.AnyAsync(x => x.Id == productId && x.AppUserId == UserId);
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
            var UserId = int.Parse(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value);
            return await _context.Products.AnyAsync(x => x.ItemId == productId.ToLower() && x.AppUserId == UserId);
        }
    }
}