import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MciServiceService } from '../mci-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  password_type: string = 'password';  
  visible=true;
  password_type1: string = 'password';  
  visible1=true;
  type_login:string;
  type_login_input:string;; 
  username_input:string;
  free_user = true;
  name_login: string = '';
  type_user_input: string = '';
  fullname_input: string = '';
  email_input: string = '';
  phone_input: string = '';
  nationality_input: string = '';
  language_input: string = '';
  confirm_password_input: string = '';
  password_input: string = '';
  recom_input: string = '';
  attachment = false;
  list_country= []; 
  list_language= []; 
  tooltip_recom = false;
  pagenumber = 1;
  howknowus_input = '';
  interestjob_input = '';
  namefriends_input = '';
  nameconsultan_input = '';

  @ViewChild('type_user') myInputtype_user ;
  @ViewChild('fullname') myInputfullname ;
  @ViewChild('email') myInputemail ;
  @ViewChild('nationality') myInputnationality ;
  @ViewChild('phone') myInputphone ;
  @ViewChild('language') myInputlanguage ;
  @ViewChild('password') myInputpassword ;
  @ViewChild('howknowus') myInputhowknowus ;
  @ViewChild('confirm_password') myInputconfirm_password ;
  @ViewChild('interestjob') myInputinterestjob ;
   @ViewChild('namefriends') myInputnamefriends ;
   @ViewChild('nameconsultan') myInputnameconsultan ;

  constructor(public navCtrl: NavController,public storage: Storage, public router: Router, public loadingController: LoadingController, public mci_config: MciServiceService, public http: HttpClient) { }

  ngOnInit() {
  let $this = this;
  this.pagenumber = 1;
  this.list_language = this.mci_config.get_list_option('language'); 
  this.list_country = this.mci_config.get_list_option('nationality'); 
  this.tooltip_recom = false; 
  }

  goBack() {
    this.navCtrl.back();
  }

  showpassword(){
  	this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.visible = !this.visible;
  }
  showpassword1(){
    this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
    this.visible1 = !this.visible1;
  }


  backsubmit(){
    this.pagenumber = this.pagenumber-1
  }
  onsubmit(){
    if(this.pagenumber==1){
      this.onsubmit1()
    }
    else if(this.pagenumber==2){
      this.onsubmit2()
    }
    else if(this.pagenumber==3){
      this.onsubmit3()
    }
    
  }

  onsubmit3(){
    if(this.interestjob_input){
      this.pagenumber = this.pagenumber+1
    }
    else{
      this.myInputinterestjob.open()
    }
  }

  onsubmit2(){
    let check = true;
    if(this.howknowus_input){
      if(this.howknowus_input == 'Friends'){
        if(!this.namefriends_input){
          check = false;
          this.myInputnamefriends.setFocus();
        }
      }
      else if(this.howknowus_input == 'MCI Consultant'){
        if(!this.nameconsultan_input){
          check = false;
          this.myInputnameconsultan.open();
        }
      }
      if(check){
          this.pagenumber = this.pagenumber+1
      }
    }
    else{
      this.myInputhowknowus.open();
    }
  }
  onsubmit1(){
    if (this.fullname_input && this.email_input && this.nationality_input && this.phone_input && this.language_input && this.password_input == this.confirm_password_input && this.password_input && this.confirm_password_input){
        this.pagenumber = this.pagenumber+1
    }    
    else{
      if (!this.fullname_input){
        this.myInputfullname.setFocus();
      }
      else if (!this.email_input){
        this.myInputemail.setFocus();
      }
      else if (!this.nationality_input){
        this.myInputnationality.open();
      }
      else if (!this.phone_input){
        this.myInputphone.setFocus();
      }
      else if (!this.language_input){
        this.myInputlanguage.open();
      }
      else if (!this.password_input){
        this.myInputpassword.setFocus();
      }
      else if (!this.confirm_password_input){
        this.myInputconfirm_password.setFocus();
      }
      else if (this.confirm_password_input!=this.password_input){
        this.mci_config.alert_notif("Wrong confirm password.",false);
      }
    }
      
  }
  checkFocusrecom_input(){
    this.tooltip_recom = true;
  }
  uncheckFocusrecom_input(){
    this.tooltip_recom = false;
  }

  sharewa(){
     this.mci_config.sharewa()
  }

  process_submit(){

      this.mci_config.presentLoading();
        let $this = this;
        let url_signup = MciServiceService.api_url+'signup-user?';
        url_signup = url_signup + 'email='+this.email_input;
        url_signup = url_signup + '&candidate_full_name='+this.fullname_input;
        url_signup = url_signup + '&number_sg='+this.phone_input;
        url_signup = url_signup + '&nationality='+this.nationality_input;
        url_signup = url_signup + '&type=candidate';
        url_signup = url_signup + '&languange='+this.language_input;
        url_signup = url_signup + '&recommended_by='+this.recom_input;
        url_signup = url_signup + '&password='+this.password_input;
        url_signup = url_signup + '&know_us='+this.howknowus_input;
        url_signup = url_signup + '&job_interest='+this.interestjob_input;


    this.http.get(url_signup)
      .subscribe((data: any) => {
       console.log(data)
        if (data.code == 200){
            setTimeout(function(){ 
            $this.mci_config.success_notif(data.message) 
            $this.router.navigateByUrl('/login') 
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
       console.log(error)
          setTimeout(function(){ 
            $this.mci_config.dismissLoading()
            $this.mci_config.alert_notif(error.message,false);
          }, 3000);
          
      });
  
      
  }

  openchat(){
    this.mci_config.openchat()

  }



}
