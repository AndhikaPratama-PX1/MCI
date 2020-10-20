import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Plugins, AppState } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MciServiceService } from '../mci-service.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as launcher from '../../assets/js/launcher';

@Component({
  selector: 'app-homehome',
  templateUrl: './homehome.page.html',
  styleUrls: ['./homehome.page.scss'],
})
export class HomehomePage implements OnInit {
  type_login: string = ''; 
  free_user = true;
  name_login: string = '';
   nationality: string = '';
   email_login: string = '';
   password_login: string = '';
  attachment = false;
  list_job= []; 
  list_notif= [];
  countnotifunread = 0;
  count_all_notif= 0;
  show_notif = false;
  id_login = false;
  constructor(public storage: Storage, public router: Router, public loadingController: LoadingController, public mci_config: MciServiceService, public http: HttpClient, public InAppBrowser: InAppBrowser, private platform: Platform, private SocialSharing: SocialSharing) { }

  ngOnInit() {
    let $this = this;
    this.show_notif = false;
    this.count_all_notif= 0;
    this.countnotifunread= 0;
    this.list_notif=[];
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

    this.storage.get('nationality').then((val) => {
      this.nationality = val || '';
      this.storage.get('id_login').then((val) => {
        $this.id_login = val;
        if($this.id_login){
          $this.mci_config.gettokenregis($this.id_login,$this.nationality);
        }
        if($this.id_login){
          let url_get_notif =  MciServiceService.api_url+'candidate_channel/push_notification_inbox?id='+$this.id_login+'&nationality='+$this.nationality;
          this.http.get(url_get_notif)
            .subscribe((data: any) => {
              for(let notif of data.list) {
                $this.list_notif.push(notif)
                if (!notif['is_read']){
                    $this.countnotifunread = $this.countnotifunread + 1
                }
              } 
              $this.count_all_notif= $this.list_notif.length
             }, error => {
                setTimeout(function(){ 
                  $this.mci_config.dismissLoading()
                  $this.mci_config.alert_notif(error.message,false);
                }, 3000);
                
            });
        }

        let url_list_job = MciServiceService.api_url+'list-job?token='+MciServiceService.api_token+'&nationality='+this.nationality;
        if(this.id_login){
          url_list_job = url_list_job+'&user_id='+this.id_login;
        }
        this.http.get(url_list_job)
          .subscribe((data: any) => {
            let count = 0;
            for(let job of data) {
              $this.list_job.push(job.information)
              count = count+1
              if (count==10){
                break
              }
            }
           }, error => {
              setTimeout(function(){ 
                $this.mci_config.dismissLoading()
                $this.mci_config.alert_notif(error.message,false);
              }, 3000);
              
          });
          
      });
      
    });

  }

  sharewa(){
    this.mci_config.sharewa()

  }

  



  detail_form(job_id){
   if(this.type_login){
      this.router.navigate(['detail-job',{job_id:job_id}])
    }
    else{
      this.router.navigateByUrl('/needloginaccount')
    }

   
  }



  logout(){
    this.mci_config.reset_session(true)    
  }

  saved_job(job){
    let $this = this;
    if (!job.saved){

      let url_boormark = MciServiceService.api_url+'save-jobs?jobs_id='+job.id+'&user_id='+this.id_login
      this.http.get(url_boormark)
        .subscribe((data: any) => {
          job.saved = true;
         }, error => {
            $this.mci_config.alert_notif(error.message,false);
            
        });

    }
    else
    {

      let url_boormark = MciServiceService.api_url+'Job_order/DeleteSavedJob?jobs_id='+job.id+'&user_id='+this.id_login
      this.http.get(url_boormark)
        .subscribe((data: any) => {
          job.saved = false;
         }, error => {
            $this.mci_config.alert_notif(error.message,false);
            
        });

    }
      
  }

  gojoblisting(){
    if(this.type_login){
      this.router.navigate(['list-job',{state:'job_listing'}])
    }
    else{
      this.router.navigateByUrl('/needloginaccount')
    }
    
  }


  openchat(){
    this.mci_config.openchat()

  }

  shownotif(){
    let $this = this;
    if(! this.id_login){
      this.mci_config.alert_notif("You need sign in first to see notifications.",false);
    }
    else{
        if(this.count_all_notif){
          if (this.show_notif){
              this.show_notif = false;
          }
          else{
              this.show_notif = true;
              let url = '';
               for(let notif of this.list_notif) {
                  url = MciServiceService.api_url+'candidate_channel/push_notification_read?id='+notif['id']+'&candidate_id='+this.id_login+'&nationality='+this.nationality
                  console.log(MciServiceService.api_url+'candidate_channel/push_notification_read?id='+notif['id']+'&candidate_id='+this.id_login+'&nationality='+this.nationality)
                  this.http.get(url)
                    .subscribe((data: any) => {
                      console.log(data)
                     }, error => {
                        $this.mci_config.alert_notif(error.message,false);
                        
                    });

               }
          }
        }
        else{
          $this.mci_config.alert_notif("No notification.",false);
        }
                  

    }
  } 


}
