using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test.Implementations.IServices;
using Test.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserManagement _user;
        public LoginController(IUserManagement user) {
            _user = user;
        
        }
        // GET: api/<LoginController>
        ////[HttpGet]
        ////public IEnumerable<string> Get()
        ////{
        ////    return new string[] { "value1", "value2" };
        ////}

        ////// GET api/<LoginController>/5
        ////[HttpGet("{id}")]
        ////public string Get(int id)
        ////{
        ////    return "value";
        ////}

        // POST api/<LoginController>
        [HttpPost]
        public async Task<bool> Post(LoginViewModel model)
        {
            bool result = false;
            try
            {
                if (!String.IsNullOrEmpty(model.Email) && !String.IsNullOrEmpty(model.Password))
                {
                    var user = await _user.LogInUser(model);
                    if (!String.IsNullOrEmpty(user))
                    {
                        result = true;
                    }
                }
                
            }
            catch (Exception e)
            {

                throw new ApplicationException(e.Message);
            }

            return result;
        }

        ////// PUT api/<LoginController>/5
        ////[HttpPut("{id}")]
        ////public void Put(int id, [FromBody] string value)
        ////{
        ////}

        ////// DELETE api/<LoginController>/5
        ////[HttpDelete("{id}")]
        ////public void Delete(int id)
        ////{
        ////}
    }
}
