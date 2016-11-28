import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GiphyService } from '../../providers/giphy';
import { SocialSharing, Transfer } from 'ionic-native';
declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public trending: Array<any>;
  constructor(public navCtrl: NavController, private g: GiphyService, private platform: Platform) {
    this.trending = [];
  }
  ionViewWillEnter(){
    this.g.getTrending()
      .subscribe(data=>{
        let ray = data.data;
        this.trending = ray;
        console.log(this.trending);
        // for (let i = 0; i < ray.length; i++) {
        //     this.trending.push(ray[i].images.downsized_large);
        // }

      });
      
  }

  whatsappShare(url:string){
    console.log("Compartir por Whatsapp");
    SocialSharing.shareViaWhatsApp("Message via WhatsApp",url,null)
      .then((ok)=>{
        console.log("Success");
        console.log(ok)
      },
      (err)=>{
         console.log("failed")
         console.log(err);
      })
  }

  downloadFile(urlImage:string, idImage: string){

    const fileTransfer = new Transfer();
    let url = urlImage;
    let path: string;
    let name: string;

    name = idImage + ".gif"
    if(this.platform.is('android')){
      path = cordova.file.externalCacheDirectory
    }
    if(this.platform.is('ios')){
      path = cordova.file.tempDirectory;
    }
    fileTransfer.download(url, path + name).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log('ahora compartimos la imagen');
      this.whatsappShare(path + name);
    }, (error) => {
      console.log("Error descargando imagen");
      console.log(error);
    });
  }
   

}
