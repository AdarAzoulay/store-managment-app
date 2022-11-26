using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class ProductInformation
    {
        public string Features { get; set; }
        public string Brand { get; set; }
        public string AssembledProductWeight { get; set; }
        public string Size { get; set; }
        public string ManufacturerPartNumber { get; set; }
        public string AssembledProductDimensions { get; set; }
    }

    public class ProductVariation
    {
        public List<string> Color { get; set; }
    }
    public class ProductReviews
    {
        public string reviewed_date { get; set; }
        public string review_title { get; set; }
        public string review_text { get; set; }

        public string rating { get; set; }

        public string author_name { get; set; }

        public string badge { get; set; }

        public string review_url { get; set; }

        public string review_likes { get; set; }

        public string review_dislikes { get; set; }

    }


    public class RatingHistogram
    {
        public string five_star { get; set; }
        public string four_star { get; set; }
        public string three_star { get; set; }
        public string two_star { get; set; }
        public string one_star { get; set; }
    }

    public class CreateDraftDto
    {
        public string name { get; set; }
        public string brand { get; set; }
        public string regular_price { get; set; }
        public string sale_price { get; set; }
        public string currency { get; set; }
        public List<string> images { get; set; }
        public string seller { get; set; }
        public string availability_status { get; set; }
        public RatingHistogram rating_histogram { get; set; }
        public string rating { get; set; }
        public string review_count { get; set; }
        public ProductInformation product_information { get; set; }
        public string product_category { get; set; }
        public string model { get; set; }
        public string item_id { get; set; }
        public string gtin { get; set; }
        public string walmart_item_number { get; set; }
        public string detailed_description { get; set; }
        public string attributes { get; set; }
        public List<string> variation_item_id { get; set; }
        public List<ProductVariation> product_variations { get; set; }
        public string url { get; set; }
        public List<ProductReviews> product_reviews { get; set; }
    }


}