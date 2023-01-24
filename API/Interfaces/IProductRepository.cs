using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void AddDraft(Product product);
        void AddPhoto(Photo photo);
        void Update(Product product);
        Task<bool> SaveAllAsync();
        void DeleteDraft(Product product);
        Task<PagedList<ProductDto>> GetProductsAsync(UserParams userParams);
        Task<PagedList<ProductDto>> GetDraftsAsync(UserParams userParams);
        Task<PagedList<ProductDto>> ProductsByCurrentUser(UserParams userParams);
        Task<PagedList<ProductDto>> DraftstsByCurrentUser(UserParams userParams);
        Task<Product> GetSpesificProductAsync(int id);
        Task<ProductDto> GetSpesificProductDtoAsync(int id);
        Task<ProductDto> GetSpesificDraftAsync(int id);
         Task<bool> ProductExist(string productId);


    }
}