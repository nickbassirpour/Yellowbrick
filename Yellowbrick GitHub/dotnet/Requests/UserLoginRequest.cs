using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserLoginRequest
    {
        [Required]
        [StringLength(255, MinimumLength =5)]
        public string Email { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength =8)]
        public string Password { get; set; }

    }
}
