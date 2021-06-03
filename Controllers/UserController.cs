using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Test.Implementations.IServices;
using Test.Models;
using Test.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManagement _user;
        private readonly IMailerHelper _mailer;
        private readonly IConfiguration _config;
        public UserController(IUserManagement user, IMailerHelper mailer, IConfiguration config)
        {
            _user = user;
            _mailer = mailer;
            _config = config;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<UserTb>> Get()
        {
            return await _user.GetAllUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserTb> Get(int id)
        {
            return await _user.GetThisUser(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<bool> Post(RegisterViewModel model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = await _user.CreateUser(model);

                if (isSuccess)
                {
                    var smtpServer = _config.GetValue<string>("MailerConfig:SmtpServer");
                    var smtpPort = _config.GetValue<int>("MailerConfig:Port");
                    var isSsl = _config.GetValue<bool>("MailerConfig:SSL");
                    var smtpUserName = _config.GetValue<string>("MailerConfig:Username");
                    var smtpPassword = _config.GetValue<string>("MailerConfig:Password");
                    var mailMessage = "<h1>Hooray! You are now officially registered!</h1>";
                    var mailSubjectMessage = "User Management Notification";

                    _mailer.SmtpServer = smtpServer;
                    _mailer.SmtpPort = smtpPort;
                    _mailer.isSsl = isSsl;
                    _mailer.SmtpUserName = smtpUserName;
                    _mailer.SmtpPassword = smtpPassword;

                    await _mailer.SendEmailAsync(smtpUserName, model.Email, mailMessage, mailSubjectMessage);
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }            

            return isSuccess;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, UserTb value)
        {
            bool isSuccess = false;

            try
            {
                isSuccess = await _user.EditUser(id, value);
            }
            catch (Exception)
            {

                throw;
            }

            return isSuccess;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = await _user.DeleteUser(id);
            }
            catch (Exception)
            {

                throw;
            }

            return isSuccess;
        }
    }
}
