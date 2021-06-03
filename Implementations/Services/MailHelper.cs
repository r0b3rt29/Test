using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Test.Implementations.IServices;

namespace Test.Implementations.Services
{
    public class MailHelper : IMailerHelper
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }
        public bool isSsl { get; set; }

        public async Task<bool> SendEmailAsync(string mailSender, string mailRecipients, string mailMessage, string mailSubject)
        {
            bool isMailSent = false;

            try
            {
                SmtpClient client = new SmtpClient();
                MailAddress from = new MailAddress(mailSender);
                MailAddress to = new MailAddress(mailRecipients);
                MailMessage message = new MailMessage(from, to) {
                    Body = mailMessage,
                    IsBodyHtml = true,
                    Subject = mailSubject
                };

                client.Host = SmtpServer;
                client.Port = SmtpPort;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential(SmtpUserName, SmtpPassword);

                client.EnableSsl = isSsl;
                
                client.DeliveryMethod = SmtpDeliveryMethod.Network;

                await client.SendMailAsync(message);

                isMailSent = true;
            }
            catch (Exception e)
            {
                isMailSent = false;
            }

            return isMailSent;

        }
    }
}
