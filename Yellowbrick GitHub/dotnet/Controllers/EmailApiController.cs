using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.Emails;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private readonly IEmailService _service = null;
        public EmailApiController(IEmailService service, ILogger<EmailApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost("test")]
        public ActionResult<SuccessResponse> Test()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.SendTest();

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost("contactus")]
        public ActionResult<SuccessResponse> ContactUsRequest(ContactUsRequest contactUs)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.SendContactUs(contactUs);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    }
}
