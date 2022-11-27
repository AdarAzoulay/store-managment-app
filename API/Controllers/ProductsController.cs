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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/")]
    [Authorize]
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

        [HttpGet("drafts/{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProductDto(int id)
        {
            var rtn = await _productRepository.GetSpesificDraftAsync(id);
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
            product.Brand = productUpdateDto.Brand;

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
            //add check if products exist by the product ID.
            if (await _productRepository.ProductExist(scrapeheroCloud.ProductId)) return BadRequest("Already exists in Draft/Products");
            var id = User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value;
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
                AppUserId = int.Parse(id),
                ItemId = value.item_id
            };

            _productRepository.AddDraft(draft);
            if (!(await _productRepository.SaveAllAsync())) return BadRequest("Failed to Craete Draft");

            var product = await _productRepository.GetSpesificProductAsync(draft.Id);
            bool first = true;
            foreach (var item in value.images)
            {
                if (first)
                {
                    var photo = new Photo
                    {
                        IsMain = true,
                        ProductId = draft.Id,
                        Url = item
                    };
                    _productRepository.AddPhoto(photo);
                    first = false;
                }
                else
                {
                    var photo = new Photo
                    {
                        IsMain = false,
                        ProductId = draft.Id,
                        Url = item
                    };
                    _productRepository.AddPhoto(photo);
                }
            }

            if (await _productRepository.SaveAllAsync()) return _mapper.Map<ProductDto>(draft);
            return BadRequest("Failed to Craete Draft");
        }

        [HttpPut("set-main-photo")]
        public async Task<ActionResult> SetMainPhoto(UpdateMainPhotoDto updateMainPhotoDto)
        {
            var product = await _productRepository.GetSpesificProductAsync(updateMainPhotoDto.ProductId);

            // this is synchronous, we allready have the user and it's photos in memory, no walk to the DB
            var photo = product.Photos.FirstOrDefault(p => p.Id == updateMainPhotoDto.PhotoId);

            if (photo.IsMain) return BadRequest("This is already the main photo");

            var currentMain = product.Photos.FirstOrDefault(p => p.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;


            if (await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set photo to main");
        }
    }
}