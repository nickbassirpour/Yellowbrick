using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System.Collections.Generic;
using Sabio.Models.AppSettings;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Sabio.Models.Requests.Emails;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private readonly AppKeys _appKeys;
        private readonly SendInBlueAdmin _sibAdmin;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly DomainName _domain; 
             
        public EmailService(IOptions<AppKeys> appKeys, 
            IOptions<SendInBlueAdmin> sibAdmin, 
            IOptions<DomainName> domain,
            IWebHostEnvironment webHostEnvironment)
        {
            _appKeys = appKeys.Value;
            _sibAdmin = sibAdmin.Value;
            _domain = domain.Value;
            _webHostEnvironment = webHostEnvironment;

            Configuration.Default.AddApiKey("api-key", _appKeys.SendInBlueAppKey);
        }

        public void SendTest()
        {

            var senderInfo = new SendSmtpEmailSender("Jhon Doe", "jhondoe@dispostable.com");
            List<SendSmtpEmailTo> recipients = new List<SendSmtpEmailTo>();
            var recipOne = new SendSmtpEmailTo("doemrjhon@dispostable.com", "Mr Doe");
            recipients.Add(recipOne);
            string body = HtmlBody("BaseEmail.html");
            string emailSubject = "Testing Email to Doe, Now with template";

            var sendSmtpEmail = new SendSmtpEmail(sender: senderInfo, to: recipients, htmlContent: body, subject: emailSubject);

            SendTransactionEmail(sendSmtpEmail);

        }

        public void SendContactUs(ContactUsRequest contactUsData)
        {
            /*  Email sent to Admin  */
            var senderInfo = new SendSmtpEmailSender(contactUsData.Name, contactUsData.Email);
            List<SendSmtpEmailTo> recipients = new List<SendSmtpEmailTo>();
            var recipOne = new SendSmtpEmailTo(_sibAdmin.Email, _sibAdmin.Name);
            recipients.Add(recipOne);
            string body = contactUsData.Message;
            string emailSubject = "Contact Us Email Requested";

            var emailToAdmin = new SendSmtpEmail(sender: senderInfo, to: recipients, htmlContent: body, subject: emailSubject);

            SendTransactionEmail(emailToAdmin);

            /*  Auto response to user  */
            var adminInfo = new SendSmtpEmailSender(_sibAdmin.Name, _sibAdmin.Email);
            List<SendSmtpEmailTo> userAddreses = new List<SendSmtpEmailTo>();
            var userInfo = new SendSmtpEmailTo(contactUsData.Email, contactUsData.Name);
            userAddreses.Add(userInfo);
            string contactUsBody = HtmlBody("ContactUsResponse.html");
            string emailSubject2 = "We have recieved your request";

            var emailToUser = new SendSmtpEmail(sender: adminInfo, to: userAddreses, htmlContent: contactUsBody, subject: emailSubject2);

            SendTransactionEmail(emailToUser);
        }

        public void ConfirmEmailBody(string email, string firstName, string token)
        {
            var adminInfo = new SendSmtpEmailSender(_sibAdmin.Name, _sibAdmin.Email);
            List<SendSmtpEmailTo> userAddreses = new List<SendSmtpEmailTo>();
            var userInfo = new SendSmtpEmailTo(email, firstName);
            userAddreses.Add(userInfo);
            string confirmUserBody = HtmlBodyUserAuth("ConfirmEmail.html", email, token);
            string emailSubject = $"{firstName} Please Confirm Your Email with Yellowbrick!";

            var emailToUser = new SendSmtpEmail(sender: adminInfo, to: userAddreses, htmlContent: confirmUserBody, subject: emailSubject);

            SendTransactionEmail(emailToUser);
        }

        public void ResetPasswordBody(string email, string firstName, string token)
        {
            var adminInfo = new SendSmtpEmailSender(_sibAdmin.Name, _sibAdmin.Email);
            List<SendSmtpEmailTo> userAddreses = new List<SendSmtpEmailTo>();
            var userInfo = new SendSmtpEmailTo(email, firstName);
            userAddreses.Add(userInfo);
            string confirmUserBody = HtmlBodyUserAuth("ResetPassword.html", email, token);
            string emailSubject = $"{firstName}, Please Reset your Password with Yellowbrick!";

            var emailToUser = new SendSmtpEmail(sender: adminInfo, to: userAddreses, htmlContent: confirmUserBody, subject: emailSubject);

            SendTransactionEmail(emailToUser);
        }

        public void AdminInviteBody(string email, string token)
        {
            var adminInfo = new SendSmtpEmailSender(_sibAdmin.Name, _sibAdmin.Email);
            List<SendSmtpEmailTo> userAddresses = new List<SendSmtpEmailTo>();
            var userInfo = new SendSmtpEmailTo(email);
            userAddresses.Add(userInfo);
            string adminInviteBody = HtmlBodyUserAuth("AdminInvite.html", email, token);
            string emailSubject = $"Welcome to Yellowbrick!";

            var emailTouser = new SendSmtpEmail(sender: adminInfo, to: userAddresses, htmlContent: adminInviteBody, subject: emailSubject);

            SendTransactionEmail(emailTouser);
        }

        private void SendTransactionEmail(SendSmtpEmail sendSmtpEmail)
        {
            var apiInstance = new TransactionalEmailsApi();

            apiInstance.SendTransacEmail(sendSmtpEmail);

        }

        private string HtmlBody(string fileName)
        {
            var templatePath = _webHostEnvironment.WebRootPath + Path.DirectorySeparatorChar.ToString() + "EmailTemplates" + Path.DirectorySeparatorChar.ToString() + fileName;

            StreamReader streamReader = System.IO.File.OpenText(templatePath);
            string body = streamReader.ReadToEnd();

            return body;
        }

        private string HtmlBodyUserAuth(string fileName, string email, string token)
        {
            var templatePath = _webHostEnvironment.WebRootPath + Path.DirectorySeparatorChar.ToString() + "EmailTemplates" + Path.DirectorySeparatorChar.ToString() + fileName;

            StreamReader streamReader = System.IO.File.OpenText(templatePath);
            string body = streamReader.ReadToEnd();

            body = body.Replace("@email", email);
            body = body.Replace("@token", token);
            body = body.Replace("@domainName", _domain.Url);

            return body;
        }

    }
}
