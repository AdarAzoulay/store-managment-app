using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void AddDraft(Product product);
        void AddPhoto(Photo photo);
        void Update(Product product);
        Task<bool> SaveAllAsync();
        void DeleteDraft(Product product);
        Task<IEnumerable<ProductDto>> GetProductsAsync();
        Task<IEnumerable<ProductDto>> GetDraftsAsync();
        Task<IEnumerable<ProductDto>> ProductsByUsernameAsync(string username);
        Task<IEnumerable<ProductDto>> DraftsByUsernameAsync(string username);
        Task<Product> GetSpesificProductAsync(int id);
        Task<ProductDto> GetSpesificDraftAsync(int id);
         Task<bool> ProductExist(string productId);


    }
}