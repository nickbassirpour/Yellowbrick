using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models;
using Sabio.Models.Domain;

namespace Sabio.Models.Requests.Users
{
    public class CurrentUser : UserBase
    {
        public string AvatarUrl { get; set; }
    }
}
