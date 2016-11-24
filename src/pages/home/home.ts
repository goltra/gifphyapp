import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GiphyService } from '../../providers/giphy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public trending: Array<any>;
  constructor(public navCtrl: NavController, private g: GiphyService) {
    this.trending = [];
  }
  ionViewWillEnter(){
    this.g.getTrending()
      .subscribe(data=>{
        let ray = data.data;
        for (let i = 0; i < ray.length; i++) {
            this.trending.push(ray[i].images.downsized_large);
        }
        console.log(this.trending);
      })
  }

}
