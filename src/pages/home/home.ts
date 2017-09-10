import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GiphyService } from '../../providers/giphy';
import { VariosService } from '../../providers/varios.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public trending: Array<any>;
  constructor(public navCtrl: NavController,
    private g: GiphyService,
    private platform: Platform,
    private v: VariosService, public ss: SocialSharing,
    public transfer: FileTransfer) {
    this.trending = [];
  }
  ionViewWillEnter() {
    this.g.getTrending()
      .subscribe(data => {
        let ray = data.data;
        this.trending = ray;
        console.log(this.trending);
        // for (let i = 0; i < ray.length; i++) {
        //     this.trending.push(ray[i].images.downsized_large);
        // }

      });

  }
  convierteImagen(url: string) {
    let self = this;
    //url = "https://lh5.googleusercontent.com/-7gDm1Tjt_FM/T0t6MsWvVDI/AAAAAAAAACw/KmsBaHS3Ae4/s800/15-%2520lucia%2520lopez-pajaro.gif";
    this.downloadFile(url, 'a');
    // this.v.imgToBase64(url,function(res){
    //   let imgB64:string;
    //   imgB64 = res;
    //   self.whatsappShare(imgB64);     
    // },'image/gif');
  }
  whatsappShare(url: string) {
    console.log("Compartir por Whatsapp");
    url = "https://lh5.googleusercontent.com/-7gDm1Tjt_FM/T0t6MsWvVDI/AAAAAAAAACw/KmsBaHS3Ae4/s800/15-%2520lucia%2520lopez-pajaro.gif";

    var options = {
      files: [url],
      message: 'compartido'
    }
    this.ss.shareViaWhatsApp('mensaje por ws', url, null)
      .then((ok) => {
        console.log("Success");
        console.log(ok)
      },
      (err) => {
        console.log("failed")
        console.log(err);
      });

  }
  compartePorFb(url){
    this.ss.shareViaFacebook('hola','' , url).then(res => {
      console.log('compartientdo por fb');
      console.log(res);
    }, (error) => {
      console.log("Facebook Error compartiendo imagen");
      console.log(error);
    })
  }
  compartePorWhatsapp(url){
    this.ss.shareViaWhatsApp('hola','' , url).then(res => {
        console.log('compartientdo por whatsapp');
        console.log(res);
      }, (error) => {
        console.log("Whatsapp Error compartiendo imagen");
        console.log(error);
      })
  }
  
  downloadFile(urlImage: string, idImage: string) {

    const fileTransfer: FileTransferObject = this.transfer.create();
    let url = urlImage;
    let path: string;
    let name: string;

    name = idImage + ".gif"
    if (this.platform.is('android')) {
      path = cordova.file.externalCacheDirectory
    }
    if (this.platform.is('ios')) {
      path = cordova.file.tempDirectory;
    }
    fileTransfer.download(url, path + name).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log('ahora compartimos la imagen');
      // this.ss.canShareVia('facebook').then(res=>{
      //   console.log('puedo compartir por facebook??');
      //   console.log(res)
      // },(error)=>{
      //   console.log('no puedo compartir por facebook');
      //   console.log(error);
      // })
     
      // 
      // this.ss.shareViaTwitter('hola','' , url).then(res => {
      //   console.log('compartientdo por twitter');
      //   console.log(res);
      // }, (error) => {
      //   console.log("Twitter Error compartiendo imagen");
      //   console.log(error);
      // })
      //this.whatsappShare(path + name);
    }, (error) => {
      console.log("Error descargando imagen");
      console.log(error);
    });
  }


}
