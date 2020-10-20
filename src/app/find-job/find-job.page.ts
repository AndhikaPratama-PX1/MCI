import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { MciServiceService } from '../mci-service.service';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.page.html',
  styleUrls: ['./find-job.page.scss'],
})
export class FindJobPage implements OnInit {
   type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  job_title_input: string = '';
  type_of_pass_input: string = '';
  count_job = 0;
  attachment = false;
  search_check = false;
  id_login = false;
  list_type_off_pass = [];
  public listjob = []
  nationality = '';
  
  constructor(public storage: Storage, public router: Router, public navCtrl: NavController, public loadingController: LoadingController, public mci_config: MciServiceService, public http: HttpClient) { }

  ngOnInit() {
    this.search_check = false;
    this.storage.get('type_login').then((val) => {
      this.type_login = val || '';
      if (this.type_login){
       this.storage.get('free_user').then((val) => {
        this.free_user = val || '';
      });
    }
    });
    this.storage.get('nationality').then((val) => {
      this.nationality = val || '';
    });
    this.storage.get('id_login').then((val) => {
      this.id_login = val || '';
    });
    this.list_type_off_pass = this.mci_config.get_list_option('type_of_pass');
  }
  check_search(){
    this.listjob = [];
    this.count_job = 0;
  	let $this = this;
    let urllistjob = MciServiceService.api_url+'list-job?'
    let parameter_input = '';
    if (this.job_title_input || this.type_of_pass_input){
       this.mci_config.presentLoading();
      this.search_check = true;
      if(this.job_title_input){
        if (! parameter_input){
          parameter_input = 'name='+this.job_title_input
        }
        else{
          parameter_input = parameter_input + '&name='+this.job_title_input
        }
      }
      if(this.type_of_pass_input){
        if (! parameter_input){
          parameter_input = 'type_of_pass='+this.type_of_pass_input
        }
        else{
          parameter_input = parameter_input + '&type_of_pass='+this.type_of_pass_input
        }
      }

      if(parameter_input){
        urllistjob= urllistjob+parameter_input
        if(this.id_login){
          urllistjob = urllistjob+'&user_id='+this.id_login+'&nationality='+this.nationality;
        }
      }
      
      $this.http.get(urllistjob)
        .subscribe((data: any) => {
          let count = 0;
            for(let job of data) {
              $this.listjob.push(job.information)
            }
            $this.count_job = $this.listjob.length
            setTimeout(function(){ 
              $this.mci_config.dismissLoading()
            }, 3000);

         }, error => {
            setTimeout(function(){ 
            $this.mci_config.dismissLoading()
              $this.mci_config.alert_notif(error.message,false);
            }, 3000);
            
        });
    }
    else{
      let text_error = "Please, fill in the job title "
      if(!this.free_user){
          text_error = text_error+'or type of pass '
      }
      text_error = text_error+'of jobs you are searching for'
      $this.mci_config.alert_notif(text_error,false);
    }

  }

  detail_form(job_id){
   if(this.type_login){
      this.router.navigate(['detail-job',{job_id:job_id}])
    }
    else{
      this.router.navigateByUrl('/needloginaccount')
    }

	 
  }

  goBack() {
    this.navCtrl.back();
  }

  logout(){
    this.mci_config.reset_session(false)    
  }

  openchat(){
    this.mci_config.openchat()

  }

  sharewa(){
     this.mci_config.sharewa()
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
  


}
