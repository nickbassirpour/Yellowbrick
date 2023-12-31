﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Lookups;

namespace Sabio.Models.Domain
{
    public class User : BaseUser
    {
        public LookUp Status { get; set; }
        public bool IsConfirmed { get; set; } 
        public string Email { get; set; }

        public List<LookUp> Roles { get; set; }
    }
}
