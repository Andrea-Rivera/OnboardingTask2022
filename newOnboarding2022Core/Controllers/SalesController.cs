using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace newOnboarding2022Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
    private OnboardingDBContext _dBContext;
        public SalesController(OnboardingDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        //GET ROUTE/api/sales/getsales
        [HttpGet("GetSales")]
        public IActionResult Get()
        {
            try
            {
                var sale = _dBContext.Sales
                    .Include(x => x.Store)
                    .Include(x => x.Customer)
                    .Include(x => x.Product);


                return Ok(sale.ToList());
            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred");
            }

        }

        //POST ROUTE/api/sales/createsales
        [HttpPost("CreateSales")]
        public IActionResult Create([Bind("StoreId, CustomerId, ProductId, DateSold")][FromBody] Sales createdSale)
        {
            
            try
            {    
                _dBContext.Sales.Add(createdSale);
              
                _dBContext.SaveChanges();

                // Loading navigation properties.
                _dBContext.Entry(createdSale).Reference(x => x.Store).Load();
                _dBContext.Entry(createdSale).Reference(x => x.Customer).Load();
                _dBContext.Entry(createdSale).Reference(x => x.Product).Load();
                



            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred");
            }
            //Get all sales in a List
            var saleDisplay = _dBContext.Sales.ToList();
            return Ok(saleDisplay);
        }

        //PUT ROUTE/api/sales/Updatesales
        [HttpPut("UpdateSales")]
        public IActionResult Update([Bind("Id, StoreId, CustomerId, ProductId, DateSold")][FromBody] Sales updateSale)
        {

            try
            {
                Sales sale = _dBContext.Sales.Single(x => x.Id == updateSale.Id);

                sale.StoreId = updateSale.StoreId;
                sale.CustomerId = updateSale.CustomerId;
                sale.ProductId = updateSale.ProductId;
                sale.DateSold = updateSale.DateSold;
                //Save changes in the database.
                _dBContext.SaveChanges();

                // Loading navigation properties.
                _dBContext.Entry(updateSale).Reference(x => x.Store).Load();
                _dBContext.Entry(updateSale).Reference(x => x.Customer).Load();
                _dBContext.Entry(updateSale).Reference(x => x.Product).Load();


            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred");
            }
            //Get all sales in a List
            var saleDisplay = _dBContext.Sales.ToList();
            return Ok(saleDisplay);
        }
        //  DELETE ROUTE/api/sales/deletesales/Id
        [HttpDelete("DeleteSales/{Id}")]
        public IActionResult Delete([FromRoute]int Id)
        {
            try
            {
                var sale = _dBContext.Sales.FirstOrDefault(x => x.Id == Id);
                if (sale == null)
                {
                    return StatusCode(404, "An error has ocurred");
                }


                _dBContext.Entry(sale).State = EntityState.Deleted;
                _dBContext.SaveChanges();
            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred"); ;
            }

            //Get all users
            var saleDisplay = _dBContext.Customer.ToList();
            return Ok(saleDisplay);
        }

    }
}
