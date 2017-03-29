using Lesson03.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Lesson03.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        static List<Product> _products = new List<Product>();

        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _products.Add(product);

            return Created("api/products/" + product.Id, product);
        }
    }
}
