using Sabio.Models.Requests.Emails;
using sib_api_v3_sdk.Model;

namespace Sabio.Services
{
    public interface IEmailService
    {
        void SendTest();
        void SendContactUs(ContactUsRequest contactUsData);
        void ConfirmEmailBody(string email, string firstName, string token);
        void ResetPasswordBody(string email, string firstName, string token);
        void AdminInviteBody(string email, string token);
    }
}