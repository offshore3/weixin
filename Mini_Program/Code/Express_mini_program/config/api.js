const ApiRootUrl = 'http://127.0.0.1:8089/api/';

module.exports = {
  LoginUrl:ApiRootUrl + "user/login",
  SenderAddressList: ApiRootUrl + "sender/address-list",
  SenderAddress: ApiRootUrl + "sender/address/{id}",
  SenderAddressAdd: ApiRootUrl + "sender/address",

}