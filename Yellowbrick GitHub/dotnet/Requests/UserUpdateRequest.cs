using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserUpdateRequest
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        [StringLength(2)]
        public string Mi { get; set; }
        [StringLength(255)]
        [Url]
        public string AvatarUrl { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
