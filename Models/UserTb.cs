using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class UserTb
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
