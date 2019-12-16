using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using miniapi.Models;
using Microsoft.EntityFrameworkCore;

namespace miniapi.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly MysqlDbContext _context;
        public UsersController(MysqlDbContext context)
        {
            _context = context;
        }
        // GET api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _context.Users;
        }

        // Get api/Users/GetUserByLogin
        [HttpGet("GetUserByLogin")]
        public async Task<IActionResult> GetUserByLogin(string login, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Login == login && x.Password == password);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET api/Users/1
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == id);

            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/Users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            entity.UserId = 0;
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = entity.UserId }, entity);
        }

        // PUT api/Users/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute]int id, [FromBody]User entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.UserId)
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
                if (!UserExists(id))
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

        // DELETE api/Users/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.UserId == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(x => x.UserId == id);
        }
    }
}
