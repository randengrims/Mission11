using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDBContext _waterContext;
        public WaterController(WaterDBContext temp) => _waterContext = temp;
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1)
        {
            var something = _waterContext.Projects
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

            var totalNumProjects = _waterContext.Projects.Count();

            var someObject = new
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
            };
            return Ok(someObject);
        }
        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }
    }
}
