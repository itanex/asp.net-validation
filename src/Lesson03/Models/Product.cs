using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lesson03.Models
{
    public class Product: IValidatableObject
    {
        public int Id { get; set; }

        //[Required(ErrorMessage = "Product name is required!")]
        //[MaxLength(10, ErrorMessage = "Product name is too long!")]
        public string Name { get; set; }

        //[Range(0, 100, ErrorMessage = "Product price must be greater than 0 and less than 100!")]
        public decimal Price { get; set; }

        
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();

            // validate product.name
            if (String.IsNullOrWhiteSpace(Name))
            {
                results.Add(new ValidationResult("Product Name is required!", new string[] { "Name" }));
            }

            // validate product.name
            if (Name.Length > 10)
            {
                results.Add(new ValidationResult("Product name is too long!", new string[] { "Name" }));
            }

            // validate product.Price
            if (Price <= 0 || Price > 100)
            {
                results.Add(new ValidationResult("Product price must be greater than 0 and less than 100!", new string[] { "Price" }));
            }

            return results;
        }
    }
}
