import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {
    var $this = this
    $this.go_page()
  }

  go_page(){
    var $this = this
    var check_online = navigator.onLine
    if (check_online){
        $this.router.navigateByUrl('/homehome');
        
    }
    else{
      const alert = document.createElement('ion-alert');
  	  alert.cssClass = 'mci-custom-modal-alert';
  	  alert.header = 'Warning !';
  	  alert.message = 'No Internet Connection.';
  	  alert.buttons = [
  	  {
        	text: 'Refresh',
        	role: 'refresh',
        	cssClass: 'button_click_oa_modal',
        	handler: (reload) => {
          location.reload();
        	}
        }];

  	  document.body.appendChild(alert);
  	  return alert.present();
    }
  }

}
 