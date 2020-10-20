import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MciServiceService } from '../mci-service.service';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.page.html',
  styleUrls: ['./list-job.page.scss'],
})
export class ListJobPage implements OnInit {
  type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  id_login = '';
  attachment = false;
  list_job= []; 
  count_job =0;

  list_job1= []; 
  count_job1 =0;

  list_job2= []; 
  count_job2 =0;

  list_job3= []; 
  count_job3 =0;

  list_job4= []; 
  count_job4 =0;

  nationality: string = ''; 
  state: string = ''; 



  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public mci_config: MciServiceService, public http: HttpClient, public routeractive: ActivatedRoute) { }

  ngOnInit() {
  let $this = this;
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
    this.storage.get('attachment').then((val) => {
      this.attachment = val || '';
    });
    this.storage.get('nationality').then((val) => {
      this.nationality = val || '';
    
      this.http.get(MciServiceService.api_url+'list-job?token='+MciServiceService.api_token+'&nationality='+this.nationality)
        .subscribe((data: any) => {
          let count = 0;
          for(let job of data) {
            $this.list_job1.push(job.information)
          }
          $this.count_job1 = $this.list_job1.length
          $this.changestate(this.routeractive.snapshot.paramMap.get("state"))
         }, error => {
            $this.mci_config.alert_notif(error.message,false);
            
      });

      

      $this.storage.get('id_login').then((val) => {
        $this.id_login = val
        if($this.id_login){

            let url_list_applied_job = MciServiceService.api_url+'list-job?';
           url_list_applied_job = url_list_applied_job + 'token='+MciServiceService.api_token;
           url_list_applied_job = url_list_applied_job + '&nationality='+this.nationality;
           url_list_applied_job = url_list_applied_job + '&type_list=job_applied';
           url_list_applied_job = url_list_applied_job + '&user_id='+$this.id_login;

          this.http.get(url_list_applied_job)
            .subscribe((data: any) => {
              let count = 0;
              for(let job of data) {
                $this.list_job2.push(job.information)
              }
              $this.count_job2 = $this.list_job2.length
              $this.changestate(this.routeractive.snapshot.paramMap.get("state"))
             }, error => {
                $this.mci_config.alert_notif(error.message,false);
                
          });

          let url_list_interview_job = MciServiceService.api_url+'list-job?';
           url_list_interview_job = url_list_interview_job + 'token='+MciServiceService.api_token;
           url_list_interview_job = url_list_interview_job + '&nationality='+this.nationality;
           url_list_interview_job = url_list_interview_job + '&type_list=job_applied';
           url_list_interview_job = url_list_interview_job + '&user_id='+$this.id_login;
          this.http.get(url_list_interview_job)
            .subscribe((data: any) => {
              let count = 0;
              for(let job of data) {
                $this.list_job3.push(job.information)
              }
              $this.count_job3 = $this.list_job3.length
              $this.changestate(this.routeractive.snapshot.paramMap.get("state"))
             }, error => {
                $this.mci_config.alert_notif(error.message,false);
                
          });
          let url_list_saved_job = MciServiceService.api_url+'list-job?';
           url_list_saved_job = url_list_saved_job + 'token='+MciServiceService.api_token;
           url_list_saved_job = url_list_saved_job + '&nationality='+this.nationality;
           url_list_saved_job = url_list_saved_job + '&type_list=saved_jobs';
           url_list_saved_job = url_list_saved_job + '&user_id='+$this.id_login;
          this.http.get(url_list_saved_job)
            .subscribe((data: any) => {
              let count = 0;
              for(let job of data) {
                $this.list_job4.push(job.information)
              }
               $this.count_job4 = $this.list_job4.length
              $this.changestate(this.routeractive.snapshot.paramMap.get("state"))
             }, error => {
                $this.mci_config.alert_notif(error.message,false);
                
          });
          
        }

      });
      

    });

  }

  changestate(newstate){
      if (newstate=='job_applied'){
        this.list_job = this.list_job2
        this.count_job = this.count_job2
      }
      else if (newstate=='interview'){
        this.list_job = this.list_job3
        this.count_job = this.count_job3
      }
      else if (newstate=='saved_job'){
        this.list_job = this.list_job4
        this.count_job = this.count_job4
      }
      else{
        this.list_job = this.list_job1
        this.count_job = this.count_job1
        this.state = 'job_listing'
      }
      this.state = newstate
    
  }

  detail_form(job_id){
	 this.router.navigate(['detail-job',{job_id:job_id}])
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
