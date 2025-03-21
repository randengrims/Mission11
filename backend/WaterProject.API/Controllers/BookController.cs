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
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1)
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

            var something = _bookContext.Books
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Projects = something,
                TotalNumProjects = totalNumBooks
            };
            return Ok(someObject);
        }
    }
}
