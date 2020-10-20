import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MciServiceService } from '../mci-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password_type: string = 'password';  
  visible=true;
  free_user = true;
  username_input:string;
  password_input:string;
  loading:string;
  type_login:string;
  name_login:string;
  data:any;

  @ViewChild('password') myInputpassword ;
  @ViewChild('username') myInputusername ;

  constructor(public navCtrl: NavController,public storage: Storage, public router: Router, public loadingController: LoadingController, public http: HttpClient, public mci_config: MciServiceService) { }

  ngOnInit() {
     
  }

  showpassword(){
  	this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.visible = !this.visible;
  }

  goBack() {
    this.navCtrl.back();
  }


  onsubmit(){
    if (this.username_input && this.password_input){
        this.check();
    }    
    else{
      if (!this.username_input){
        this.myInputusername.setFocus();
      }
      else if (!this.password_input){
        this.myInputpassword.setFocus();
      }
    }
  }

  openchat(){
    this.mci_config.openchat()

  }

  sharewa(){
     this.mci_config.sharewa()
  }


  check(){
    this.mci_config.presentLoading();
    let headers1 = new HttpHeaders().set('Content-Type', 'application/json');
    headers1 = headers1.set('Access-Control-Allow-Origin', 'http://178.128.103.245:8080/code');
    headers1 = headers1.set('Accept', 'application/json;charset=UTF-8');
    headers1 = headers1.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers1 = headers1.set('Access-Control-Allow-Credentials', 'true');
    let config_h = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    let postData = {
      email: this.username_input,
      password: this.password_input,
      token:MciServiceService.api_token
    };
    let $this = this;
    this.http.get(MciServiceService.api_url+'login-user?email='+this.username_input+'&password='+this.password_input+'&token='+MciServiceService.api_token)
      .subscribe((data: any) => {
        if (data.code == 200){
            $this.storage.set('type_login', data.type_user);
            $this.storage.set('name_login', data.name);
            $this.storage.set('email_login', data.email);
            $this.storage.set('nationality', data.nationality);
            $this.storage.set('type_candidate', data.type_candidate);
            $this.storage.set('email_login', this.username_input);
            $this.storage.set('password_login', this.password_input);
            $this.storage.set('id_login', parseInt(data.user_id));
            //if (data.status_payment=='paid') {
                //$this.storage.set('free_user', false);
            //}
            //else{
                //$this.storage.set('free_user', true);
            //}
            $this.storage.set('free_user', false);
            setTimeout(function(){ 
            $this.router.navigateByUrl('/homehome') 
             $this.mci_config.dismissLoading()
            }, 3000);

    
        }
        else{
            let text_error = data.message;
            setTimeout(function(){ 
              $this.mci_config.dismissLoading()
              $this.mci_config.alert_notif(text_error,false);
            }, 3000);
        }
       }, error => {
          setTimeout(function(){ 
            $this.mci_config.dismissLoading()
            $this.mci_config.alert_notif(error.message,false);
          }, 3000);
          
      });


  }
/*
  check_testing(){
    if (this.username_input=='employee' || this.username_input=='candidate' || this.username_input=='candidate_free') {
        if (this.username_input=='candidate' || this.username_input=='candidate_free'){
          this.type_login ='candidate';
          if (this.username_input=='candidate'){
             this.free_user = false;
          }
        }
        else{
          this.free_user = false;
          this.type_login ='employee';
        }
        this.storage.set('type_login', this.type_login);
        this.storage.set('name_login', this.username_input);
        this.storage.set('free_user', this.free_user);
        this.presentLoading();
  
    }
    else{
      const alert = document.createElement('ion-alert');
      alert.cssClass = 'mci-custom-modal-alert';
      alert.header = 'Warning !';
      alert.message = 'Invalid Username & Password.<br/>Username and Password are all case sensitive.';
      alert.buttons = [
      {
          text: 'Close',
          cssClass: 'button_click_oa_modal',
        }];

      document.body.appendChild(alert);
      return alert.present();
    }
      

  }
 */
}
