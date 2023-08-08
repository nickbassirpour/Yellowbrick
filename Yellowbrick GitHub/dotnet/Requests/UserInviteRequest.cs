using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Lookups;

namespace Sabio.Models.Requests.Users
{
    public class UserInviteRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Range(8, 10)]
        public int? UserRoleId { get; set; }
    }
}
