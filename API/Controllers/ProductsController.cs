using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ProductsController : ControllerBase
    {
        WebClient client = new WebClient();
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productRepository.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("drafts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetDrafts()
        {
            var drafts = await _productRepository.GetDraftsAsync();
            return Ok(drafts);
        }

        [HttpGet("products/{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var rtn = await _productRepository.GetSpesificProductAsync(id);
            return rtn;
        }

        // [HttpGet("{username}")]
        // public async Task<ActionResult<IEnumerable<OrderDto>>> GetMemberOrders(string username)
        // {
        //     var rtn = await _orderRepository.OrdersByUsernameAsync(username);
        //     return Ok(rtn);
        // }

        [HttpPut("update-draft")]
        public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto)
        {
            var product = await _productRepository.GetSpesificProductAsync(productUpdateDto.Id);
            product.BuyPrice = productUpdateDto.BuyPrice;
            product.Title = productUpdateDto.Title;
            product.ProductCategory = productUpdateDto.ProductCategory;
            product.DetailedDescription = productUpdateDto.DetailedDescription;
            product.IsUploaded = productUpdateDto.IsUploaded;

            _productRepository.Update(product);
            if (await _productRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to update order");
        }

        [HttpPut("upload-draft")]
        public async Task<ActionResult> UploadDraft(ProductUpdateDto productUpdateDto)
        {
            var product = await _productRepository.GetSpesificProductAsync(productUpdateDto.Id);
            product.IsUploaded = productUpdateDto.IsUploaded;
            _productRepository.Update(product);
            if (await _productRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to upload order");
        }

        [HttpDelete("delete-draft/{id}")]
        public async Task<ActionResult> DeleteDraft(int id)
        {
            var draft = await _productRepository.GetSpesificProductAsync(id);

            if (draft == null)
                return NotFound();
            _productRepository.DeleteDraft(draft);
            if (await _productRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to delete message");
        }

        [HttpPost("add-draft")]
        public async Task<ActionResult<ProductDto>> CreateDraft(ScrapeheroCloud scrapeheroCloud)
        {
            var id = User.Claims.Where(x=>x.Type== "id").FirstOrDefault()?.Value;
            string jsonString = client
            .DownloadString($"https://get.scrapehero.com/wmt/product-details/?product_id={scrapeheroCloud.ProductId}&x-api-key={scrapeheroCloud.ApiKey}");
            CreateDraftDto value = JsonSerializer.Deserialize<CreateDraftDto>(jsonString);
            if (value == null)
                return NotFound();

            var draft = new Product
            {
                Title = value.name,
                Brand = value.brand,
                BuyPrice = float.Parse(value.sale_price),
                Url = value.url,
                ProductCategory = value.product_category,
                DetailedDescription = value.detailed_description,
                AppUserId= int.Parse(id)
            };

            _productRepository.AddDraft(draft);
            if (await _productRepository.SaveAllAsync()) return _mapper.Map<ProductDto>(draft);

            return BadRequest("Failed to Craete Draft");
        }

    }
}