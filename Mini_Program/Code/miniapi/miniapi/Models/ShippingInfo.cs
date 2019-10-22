using System.ComponentModel.DataAnnotations;

namespace miniapi.Models
{
    public class ShippingInfo
    {
        [Key]
        public int ShippingInfoId { get; set; }

        public string SenderName { get; set; }

        public string SenderTel { get; set; }

        public string SenderAddress { get; set; }

        public string Product { get; set; }

        public string Note { get; set; }

        public int ShippingAddressId { get; set; }

        public ShippingAddress ShippingAddress { get; set; }
    }
}
