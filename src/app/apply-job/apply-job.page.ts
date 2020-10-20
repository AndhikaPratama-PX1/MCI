import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MciServiceService } from '../mci-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.page.html',
  styleUrls: ['./apply-job.page.scss'],
})
export class ApplyJobPage implements OnInit {
   type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  job_id: string = '';
  remark: string = '';
  attachment = false;
  id_login = false;
  email_login = false;
  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, public mci_config: MciServiceService, public routeractive: ActivatedRoute, public http: HttpClient) { }

  ngOnInit() {
  this.job_id= this.routeractive.snapshot.paramMap.get("job_id")
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
    this.storage.get('id_login').then((val) => {
      this.id_login = val || '';
    });
    this.storage.get('name_login').then((val) => {
      this.name_login = val || '';
    });
    this.storage.get('email_login').then((val) => {
      this.email_login = val || '';
    });
  }


  sharewa(){
     this.mci_config.sharewa()
  }

  goBack() {
    this.navCtrl.back();
  }

  onsubmit(){
    let $this = this;
    this.mci_config.presentLoading();
    this.http.get(MciServiceService.api_url+'apply-job?job_id='+this.job_id+'&user_id='+this.id_login+'&candidate_full_name='+this.name_login+'&remarks='+this.remark)
      .subscribe((data: any) => {
         console.log(MciServiceService.api_url+'apply-job?job_id='+this.job_id+'&user_id='+this.id_login+'&candidate_full_name='+this.name_login+'&remarks='+this.remark)
        if (data.code == 200){
            setTimeout(function(){ 
            $this.router.navigateByUrl('/done-job') 
            $this.mci_config.dismissLoading()
            }, 3000);
        }
        else{
            let text_error = data.error;
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

}
