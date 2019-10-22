using System.ComponentModel.DataAnnotations;

namespace miniapi.Models
{
    public class ShippingAddress
    {
        [Key]
        public int ShippingAddressId { get; set; }

        public string Name { get; set; }

        public string Tel { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string StateProvince { get; set; }

        public string PostalCode { get; set; }
    }
}
