import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MciServiceService } from '../mci-service.service';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.page.html',
  styleUrls: ['./detail-job.page.scss'],
})
export class DetailJobPage implements OnInit {
 type_login: string = ''; 
 id_login: string = ''; 
  free_user = true;
  name_login: string = '';
  position: string = '';
  company_name: string = '';
  qualification: string = '';
  yoe: string = '';
  tos: string = '';
  dl: string = '';
  wl: string = '';
  salary_from: string = '';
  salary_to: string = '';
  job_nationality: string = '';
  saved=false;

  attachment = false;
  job_id: string = '';
  job: any;
  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public routeractive: ActivatedRoute, public navCtrl: NavController, public mci_config: MciServiceService, public http: HttpClient) { }

  ngOnInit() {
    let $this= this;
    this.storage.get('name_login').then((val) => {
       $this.name_login = val || '';
    });
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
    
      this.job_id= this.routeractive.snapshot.paramMap.get("job_id")
      //this.state_job= this.routeractive.snapshot.paramMap.get("state_job")
      let url_detail = MciServiceService.api_url+'list-job?id='+this.job_id+'&token='+MciServiceService.api_token
      if (this.id_login){
        url_detail = url_detail+'&user_id='+this.id_login
      }
      this.http.get(url_detail)
        .subscribe((data: any) => {
          let job = data[0].information;
          $this.position = job.position;
          $this.company_name = job.company_name;
          $this.qualification = job.qualification;
          $this.yoe = job.years_of_experience;
          $this.tos = job.type_of_skill;
          $this.dl = job.driving_licence;
          $this.salary_from = job.gross_salary_from;
          $this.salary_to = job.gross_salary_to;
          $this.job_nationality = job.nationality;
          $this.saved = job.saved
          

         }, error => {
            setTimeout(function(){ 
              $this.mci_config.dismissLoading()
              $this.mci_config.alert_notif(error.message,false);
            }, 3000);
            
        });

    });

    
  }


  
  check_resume(job_id){
    this.router.navigate(['apply-job',{job_id:job_id}])
  }

  sharewa(){
     this.mci_config.sharewa()
  }

  goBack() {
    this.navCtrl.back();
  }

  logout(){
    this.storage.set('type_login', '');
    this.storage.set('name_login', '');
    this.storage.set('free_user', true);
    this.storage.set('attachment', false);
    this.presentLoading();
    
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/homehome')
  }


  saved_job(job_id){
    let $this = this;
    if(! this.saved)
    {

      let url_boormark = MciServiceService.api_url+'save-jobs?jobs_id='+job_id+'&user_id='+this.id_login
      this.http.get(url_boormark)
        .subscribe((data: any) => {
            $this.saved = true;
         }, error => {
            $this.mci_config.alert_notif(error.message,false);
            
        });
    }
    else{
      let url_boormark = MciServiceService.api_url+'Job_order/DeleteSavedJob?jobs_id='+job_id+'&user_id='+this.id_login
      this.http.get(url_boormark)
        .subscribe((data: any) => {
          $this.saved = false;
         }, error => {
            $this.mci_config.alert_notif(error.message,false);
            
        });
    }
      

  }
  

}
