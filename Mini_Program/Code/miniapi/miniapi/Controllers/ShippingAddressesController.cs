using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using miniapi.Models;
using Microsoft.EntityFrameworkCore;

namespace miniapi.Controllers
{
    [Route("api/[controller]")]
    public class ShippingAddressesController : Controller
    {
        private readonly MysqlDbContext _context;
        public ShippingAddressesController(MysqlDbContext context)
        {
            _context = context;
        }

        // GET api/ShippingAddresses
        [HttpGet]
        public IEnumerable<ShippingAddress> Get()
        {
            return _context.ShippingAddresses;
        }

        // GET api/ShippingAddresses/1
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var entity = await _context.ShippingAddresses.SingleOrDefaultAsync(x => x.ShippingAddressId == id);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        // POST api/ShippingAddresses
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ShippingAddress entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            entity.ShippingAddressId = 0;
            _context.ShippingAddresses.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = entity.ShippingAddressId }, entity);
        }

        // PUT api/ShippingAddresses/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute]int id, [FromBody]ShippingAddress entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.ShippingAddressId)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingAddressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/ShippingAddresses/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.ShippingAddresses.SingleOrDefaultAsync(m => m.ShippingAddressId == id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.ShippingAddresses.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        private bool ShippingAddressExists(int id)
        {
            return _context.ShippingAddresses.Any(x => x.ShippingAddressId == id);
        }
    }
}
