import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { MciServiceService } from '../mci-service.service';

@Component({
  selector: 'app-needloginaccount',
  templateUrl: './needloginaccount.page.html',
  styleUrls: ['./needloginaccount.page.scss'],
})
export class NeedloginaccountPage implements OnInit {
  type_login: string = ''; 
  free_user = true;
  name_login: string = '';


  constructor(public storage: Storage, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, public mci_config: MciServiceService) { }

  ngOnInit() {
    this.storage.get('type_login').then((val) => {
      this.type_login = val || '';
      if (this.type_login){
       this.storage.get('free_user').then((val) => {
        this.free_user = val || '';
      });
    }
    });
  }

  sharewa(){
     this.mci_config.sharewa()
  }
  
  goBack() {
    this.navCtrl.back();
  }

}
