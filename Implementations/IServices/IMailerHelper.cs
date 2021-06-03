using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Implementations.IServices
{
    public interface IMailerHelper
    {
        string SmtpServer { get; set; }
        int SmtpPort { get; set; }
        string SmtpUserName { get; set; }
        string SmtpPassword { get; set; }
        bool isSsl { get; set; }
        Task<bool> SendEmailAsync(string mailSender, string mailRecipients, string mailMessage, string mailSubject);
    }
}
