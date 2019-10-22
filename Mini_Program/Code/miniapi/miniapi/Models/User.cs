using System.ComponentModel.DataAnnotations;

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
    }
}
