import HTTPService from "./httpService";

export default class InventoryService {
  constructor ({ httpService = HTTPService, baseURL = 'http://localhost:3001' } = {}) {
    this.baseURL = baseURL;
    this.httpService = new httpService();
  }

  getInventoryItems() {
    const url = this.baseURL + '/inventory';
    return this.httpService.GetRequest({ url });
  }

  deleteInventoryItem(id){
    const url = this.baseURL + '/inventory/'+id;
    return this.httpService.DeleteRequest({url});
  }

  exportAllCsv(){
    const url = this.baseURL + '/inventory/exportAllCsv';
    return this.httpService.DownloadRequest({url});
  }

  addInventoryItem(req) {
    const url = this.baseURL + '/inventory/';
    return this.httpService.PostRequest({url},req);
  }

  increaseInventoryItem(id){
    const url = this.baseURL + '/inventory/stepQuantity/'+id+'?stepInc=true';
    return this.httpService.PatchRequest({url});
  }

  decreaseInventoryItem(id){
    const url = this.baseURL + '/inventory/stepQuantity/'+id+'?stepInc=false';
    return this.httpService.PatchRequest({url});
  }

  changeInventoryName(id,req){
    const url = this.baseURL + '/inventory/updateName/'+id;
    return this.httpService.PatchRequest({url},req);
  }

}