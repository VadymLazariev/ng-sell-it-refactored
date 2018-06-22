import {Product} from "./models/product";

export class DataResponse {
  results : Product[];

  constructor(json:any){
      this.results = json.results;
  }
}
