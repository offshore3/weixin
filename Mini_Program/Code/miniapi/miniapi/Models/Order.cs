using System;
using System.ComponentModel.DataAnnotations;
using miniapi.Common;

namespace miniapi.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } //订单号
        public string TrackingNumber { get; set; } //运单号
        public User Sender { get; set; }//寄件人
        public User Recipient { get; set; }//收件人
        public decimal Price { get; set; }
        public GoodsType GoodsType { get; set; } //商品类别
        public string Comment { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}