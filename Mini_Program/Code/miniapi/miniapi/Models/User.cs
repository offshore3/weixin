using System;
using System.ComponentModel.DataAnnotations;
using miniapi.Common;

namespace miniapi.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public bool IsEnabled { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        //public string Address1 { get; set; }

        //public string Address2 { get; set; }

        //public DateTime Created { get; set; }

        //public Role Role { get; set; }
    }
}
