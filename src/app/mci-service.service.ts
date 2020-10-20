import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
@Injectable()
export class MciServiceService {
  public static api_url: string = "http://165.22.111.28/code/";
  public static api_token: string = "mobile56s";

  api_url_local  = "http://165.22.111.28/code/";
  api_token_local = "mobile56s";
  reload: string ='';
  free_user = true;
  name_login: string = '';
  type_login: string = '';
  attachment = false;
  nationality: string = '';


  constructor(public router: Router, public loadingController: LoadingController, public http: HttpClient,public storage: Storage, private platform: Platform, private SocialSharing: SocialSharing, private FirebaseX: FirebaseX) { }


  gettokenregis(id_login,nationality){
      let $this = this;
      this.FirebaseX.getToken().then(token => {
        let url_update = this.api_url_local+'candidate_channel/edit_profile?'
        url_update= url_update+'id='+ id_login;
        url_update= url_update+'&nationality='+ nationality;
        url_update= url_update+'&token='+ token;
        this.http.get(url_update)
        .subscribe((data: any) => {
          if (data.code != 200){
           let text_error = data.message;
            this.alert_notif(text_error,false);
        }
         }, error => {
            this.alert_notif(error.message,false); 
        });

      })
      .catch(error => alert('Error getting token ' +error));
  }

  

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'mci-loading',
      message: 'Please wait...',
    });
    await loading.present();  
  }

  async loading_auto_off(reload) {
    const loading = await this.loadingController.create({
      cssClass: 'mci-loading',
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();  
    if (reload){
      location.reload();
    }
    else{
      this.router.navigateByUrl('/homehome')
    }
    await this.loadingController.dismiss();

  }

  async dismissLoading(){
    await this.loadingController.dismiss();
  }

  alert_notif(text_error,show){
   let check_online = navigator.onLine
   if (! check_online){
      text_error = "No Internet Connection."
   }
   const alert = document.createElement('ion-alert');
      alert.cssClass = 'mci-custom-modal-alert';
      alert.header = 'Alert';
      alert.message = text_error;
      if (! check_online){
        alert.buttons = [
  	  {
        	text: 'Refresh',
        	role: 'refresh',
        	cssClass: 'button_click_oa_modal',
        	handler: (reload) => {
          location.reload();
        	}
        }];
      }
      else{
      	alert.buttons = [
	      {
	          text: 'Close',
	          cssClass: 'button_click_oa_modal',
	        }];
      }
	      

      document.body.appendChild(alert);
      return alert.present();
  }

  success_notif(text_success){
   const alert = document.createElement('ion-alert');
      alert.cssClass = 'mci-custom-modal-success';
      alert.header = 'Success';
      alert.message = text_success;
      alert.buttons = [
      {
          text: 'OK',
          role: 'OK',
          cssClass: 'button_click_oa_modal',
        }];
        

      document.body.appendChild(alert);
      return alert.present();
  }


  reset_session(reload){
      this.storage.set('type_login', '');
      this.storage.set('name_login', '');
      this.storage.set('free_user', true);
      this.storage.set('nationality', '');
      this.storage.set('type_candidate', '');
      this.storage.set('email_login', '');
      this.storage.set('password_login', '');
      this.storage.set('id_login', '');
      this.loading_auto_off(reload)
  }

  get_list_option (option){
    let result_list = [];
   
    if(option=='nationality'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.nationalities) {
          result_list.push(data.information.nationalities[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }

    else if(option=='yoe'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.qualification) {
          result_list.push(data.information.qualification[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='qualification'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.years_of_experience) {
          result_list.push(data.information.years_of_experience[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='levy_type'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.levy_type) {
          result_list.push(data.information.levy_type[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='type_of_pass'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.type_of_pass) {
          result_list.push(data.information.type_of_pass[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='yos'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.years_in_sg) {
          result_list.push(data.information.years_in_sg[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='yos'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.years_in_sg) {
          result_list.push(data.information.years_in_sg[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='work_location'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.work_location) {
          result_list.push(data.information.work_location[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='work_location'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.work_location) {
          result_list.push(data.information.work_location[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    else if(option=='function'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.function) {
          result_list.push(data.information.function[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }

    else if(option=='language'){
      this.http.get(this.api_url_local+'get-option?token='+this.api_token_local)
      .subscribe((data: any) => {
        for(let option in data.information.languange) {
          result_list.push(data.information.languange[option])
        }
       }, error => {
          setTimeout(function(){ 
            this.dismissLoading()
            this.alert_notif(error.message,false);
          }, 3000);
          
      });
    }


    return result_list;


  }

  sharewa(){
    let $this = this;
    this.SocialSharing.shareViaWhatsApp('Download Link App',null,'https://www.mci.com.sg/').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      $this.alert_notif('Whatsapp is not available',false)
    });

  }


  openchat(){
    let $this = this;
    this.storage.get('id_login').then((val) => {
      let id_login = val || false;
      this.storage.get('free_user').then((val) => {
        let free_user = val || false;
        if (! id_login) {
          this.alert_notif("Please, sign in first to use this chats.",false);
        }
        else if (free_user){
          this.alert_notif("You need to activate as Member to  use this chats.",false);
        }
        else{

            this.SocialSharing.shareViaWhatsAppToReceiver('6593542331','Hi, I want to ask...',null,null).then(() => {
            }).catch(() => {
              $this.alert_notif('Whatsapp is not available',false)
            });

        }
      });
    });

    
          

  }


}
