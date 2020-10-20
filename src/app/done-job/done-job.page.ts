import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MciServiceService } from '../mci-service.service';


@Component({
  selector: 'app-done-job',
  templateUrl: './done-job.page.html',
  styleUrls: ['./done-job.page.scss'],
})
export class DoneJobPage implements OnInit {
   type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  attachment = false;

  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public mci_config: MciServiceService) { }

  ngOnInit() {
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

  goBack(){
	 this.router.navigateByUrl('/list-job')
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

  

}
