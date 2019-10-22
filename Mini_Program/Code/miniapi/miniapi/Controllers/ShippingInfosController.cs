using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using miniapi.Models;
using Microsoft.EntityFrameworkCore;

namespace miniapi.Controllers
{
    [Route("api/[controller]")]
    public class ShippingInfosController : Controller
    {
        private readonly MysqlDbContext _context;
        public ShippingInfosController(MysqlDbContext context)
        {
            _context = context;
        }
        // GET api/ShippingInfos
        [HttpGet]
        public IEnumerable<ShippingInfo> Get()
        {
            return _context.ShippingInfos.Join(_context.ShippingAddresses, x => x.ShippingAddressId, y => y.ShippingAddressId, (x, y) =>
            new ShippingInfo
            {
                ShippingInfoId = x.ShippingInfoId,
                SenderAddress = x.SenderAddress,
                SenderTel = x.SenderTel,
                SenderName = x.SenderName,
                Product = x.Product,
                Note = x.Note,
                ShippingAddressId = x.ShippingAddressId,
                ShippingAddress = y
            });
        }

        // GET api/ShippingInfos/1
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var entity = await _context.ShippingInfos.SingleOrDefaultAsync(x => x.ShippingInfoId == id);

            if (entity == null)
            {
                return NotFound();
            }

            var shippingAddress = await _context.ShippingAddresses.SingleOrDefaultAsync(x => x.ShippingAddressId == entity.ShippingAddressId);
            if (shippingAddress != null)
            {
                entity.ShippingAddress = shippingAddress;
            }

            return Ok(entity);
        }

        // POST api/ShippingInfos
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ShippingInfo entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            entity.ShippingInfoId = 0;
            _context.ShippingInfos.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = entity.ShippingInfoId }, entity);
        }

        // PUT api/ShippingInfos/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute]int id, [FromBody]ShippingInfo entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.ShippingInfoId)
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
                if (!ShippingInfoExists(id))
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

        // DELETE api/ShippingInfos/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.ShippingInfos.SingleOrDefaultAsync(m => m.ShippingInfoId == id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.ShippingInfos.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        private bool ShippingInfoExists(int id)
        {
            return _context.ShippingInfos.Any(x => x.ShippingInfoId == id);
        }
    }
}
