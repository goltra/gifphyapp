import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GiphyService {
  rootUrl: string;
  path: string;
  key:string;

  constructor(public http: Http) {
    console.log('Giphy Provider');
    this.key = "dc6zaTOxFJmzC";
    this.rootUrl = "http://api.giphy.com";
    this.path = "/v1/gifs/"
  }

  getTrending(){
    let url = this.rootUrl+this.path+"trending?fmt=json&api_key=" + this.key;
    return this.http.get(url)
      .map(res=> res.json());

  }


}
