import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { MciServiceService } from '../mci-service.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
   type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  attachment = false;
  payment_file_input: string = '';
  upload_file = false;
  name_file : string = 'Add a file';
  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, public mci_config: MciServiceService) { }

  ngOnInit() {
    this.upload_file = false;
    this.name_file = 'Add a file';
    this.storage.get('type_login').then((val) => {
      this.type_login = val || '';
      if (this.type_login){
       this.storage.get('free_user').then((val) => {
        this.free_user = val || '';
      });
    }
    });
    this.storage.get('attachment').then((val) => {
      this.attachment = val || '';
    });
  }
  
  goBack() {
    this.navCtrl.back();
  }
  
  checkfile(event){
    let $this = this;
    this.mci_config.presentLoading();
    setTimeout(function(){ 
      $this.mci_config.dismissLoading()
      let file = event.target.files[0]; 
      if(this.payment_file_input){
        $this.name_file = file.name;
        $this.upload_file = true;
      }
      else{
        $this.name_file = 'Add a file';
        $this.upload_file = false;
      }
    }, 1000);
  }

  sharewa(){
     this.mci_config.sharewa()
  }

  make_payment(){
    this.storage.set('free_user', false);
  	const alert = document.createElement('ion-alert');
    this.router.navigateByUrl('/my-account') 
  	  alert.cssClass = 'mci-custom-modal-success';
  	  alert.header = 'Success';
  	  alert.message = 'Thank you for your payment.<br>We will confirm your payment.';
  	  alert.buttons = [
  	  {
        	text: 'OK',
        	role: 'OK',
        	cssClass: 'button_click_oa_modal',
        }];

  	  document.body.appendChild(alert);
  	  return alert.present();

  }

  loadimgselect_pay() {
    setTimeout(function(){ 
     let radios=document.getElementsByClassName('alert-radio-label');
     for (let index = 1; index < radios.length; index++) {
        let element = radios[index];
        element.innerHTML=element.innerHTML.concat('<img class="select-image" style="width: 30px;height:16px;" src="/assets/img/paypal.png" />');
      }
  }, 1000);
}

  logout(){
    this.mci_config.reset_session(false)    
  }

  openchat(){
    this.mci_config.openchat()

  }

}
