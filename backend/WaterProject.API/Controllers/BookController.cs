using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDBContext _bookContext;
        public BookController(BookDBContext temp) => _bookContext = temp;
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {

            string? favProjType = Request.Cookies["favoriteProjectType"];
            Console.WriteLine("~~~~~COOKIE~~~~~\n" + favProjType);

            HttpContext.Response.Cookies.Append("favoriteProjectType", "Protected String", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });

            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumBooks = query.Count();


            var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();


            var someObject = new
            {
                projects = something,
                totalNumProjects = totalNumBooks
            };
            return Ok(someObject);
        }

        [HttpGet("GetBookType")]
        public IActionResult GetBookTypes ()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
    }
}
