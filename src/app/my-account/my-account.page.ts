import { Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MciServiceService } from '../mci-service.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit  {
   @ViewChild('canvas') signaturePadElement ;
   @ViewChild('act_sign') act_sign ;
   @ViewChild('downloadoption') downloadoption ;

  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  type_login: string = ''; 
  free_user = true;
  name_login: string = '';
  attachment = false;
  id_login = 0;
  fullname: string = '';
  email: string = '';
  number_sg: string = '';
  number_sg_input: string = '';
  nationality: string = '';
  position: string = '';
  gender: string = '';
  race: string = '';
  region: string = '';
  expected_salary: string = '';
  qualification: string = '';
  funct: string = '';
  responsibilities: string = '';
  years_of_experience: string = '';
  nationality_input: string = '';
  type_candidate: string = '';
  type_candidate_tmp: string = '';
  fullname_input: string = '';
  currentlocation_input: string = '';
  dormlocation_input: string = '';
  dormstatus_input: string = '';
  workpermit_input: string = '';
  fileresume_input: string = '';
  url_attachment : string = ''; 

  pasportnumber_input: string = '';
  pasportnumber: string = '';
  years_of_singapore: string = '';
  typeofpass: string = '';
  levytype: string = '';
  phylocation_input: string = '';
  phylocation: string = '';
  currentsalary: string = '';
  currentsalary_input: string = '';
  number_overseas: string = '';
  number_overseas_input: string = '';
  typeofskill_input: string = '';
  typeofskill: string = '';
  mciagent: string = '';
  mciagent_input: string = '';
  oveseas_agent_input: string = '';
  oveseas_agent: string = '';
  position_input: string = '';
  email_input: string = '';
  work_location: string = '';
  cert_input: string = '';
  signatureinput: string = '';
  confirm_sign_input=false;
  blank_signature=false;
  act_sign_display='none';
  done_signature=false;
  name_file_resume = '';
  resume_file_input = '';
  downloadoption_input = '';
  tooltip_type_skill = false;
  tooltip_CO = false;
  tooltip_levytype = false;

  list_country= []; 
  list_func= []; 
  list_region= []; 
  list_qualification= []; 
  list_yoe= []; 
  list_yos= []; 
  list_wl= [];
  list_tops= [];
  list_levy_type= [];

  constructor(private elementRef: ElementRef, public storage: Storage, public loadingController: LoadingController, public router: Router, public mci_config: MciServiceService, public http: HttpClient, private theInAppBrowser: InAppBrowser, private FileTransfer: FileTransfer, private file: File, private fileOpener: FileOpener) { }

 ngOnInit() {
    let $this = this;
    this.resume_file_input = ''
    this.tooltip_type_skill = false;
    this.tooltip_CO = false;
    this.tooltip_levytype = false;
    this.fileresume_input = ''
    this.name_file_resume = 'Add a file'
    this.list_tops = this.mci_config.get_list_option('type_of_pass');
    this.list_levy_type = this.mci_config.get_list_option('levy_type');
    this.list_yos = this.mci_config.get_list_option('yos');

    this.storage.get('nationality').then((val) => {
      this.nationality = val || '';
    });
    this.storage.get('type_login').then((val) => {
      this.type_login = val || '';
      if (this.type_login){
       this.storage.get('free_user').then((val) => {
        this.free_user = val || false;
      });
    }
    });
    this.storage.get('attachment').then((val) => {
      this.attachment = val || '';
    });
    this.storage.get('type_candidate').then((val) => {
        this.type_candidate = val || '';
        this.type_candidate_tmp = val || '';
      });


      this.storage.get('id_login').then((val) => {
      $this.id_login = val;
      console.log(MciServiceService.api_url+'profile-user?id='+$this.id_login+'&type_candidate='+$this.type_candidate+'&token='+MciServiceService.api_token)
      $this.http.get(MciServiceService.api_url+'profile-user?id='+$this.id_login+'&type_candidate='+$this.type_candidate+'&token='+MciServiceService.api_token)
      .subscribe((data: any) => {
        if (data.code == 200){
            $this.fullname_input= data.message.candidate_full_name;
            $this.currentlocation_input= data.message.current_location;
            $this.number_sg_input= data.message.contact;
            $this.email_input= data.message.email;
            $this.typeofpass= data.message.type_of_pass;
            $this.levytype= data.message.levy_type;
            $this.years_of_singapore= data.message.years_of_sg;
            $this.expected_salary= data.message.expected_salary;
            $this.typeofskill_input= data.message.type_of_skill;
            $this.cert_input= data.message.certificate_obtained;
            $this.dormlocation_input= data.message.dormitory_location;
            $this.dormstatus_input= data.message.dormitory_status;
            $this.workpermit_input= data.message.work_permit_status;
            $this.url_attachment = data.message.attachment;
            if(data.message.signature){
              $this.done_signature = true
            }
            if(data.message.attachment){
              let name_file_resume = data.message.attachment
              let name_file_resume_split = name_file_resume.split('/')
              name_file_resume = name_file_resume_split[name_file_resume_split.length-1]
              $this.name_file_resume = name_file_resume
            }

        }

        else{
            let text_error = data.message; 
            $this.mci_config.alert_notif(text_error,false);
            
        }
       }, error => {
          $this.mci_config.alert_notif(error.message,false);
          
      });



    });



  }

  sharewa(){
     this.mci_config.sharewa()
  }

  checkFocustypeskill_input(){
    this.tooltip_type_skill = true;
  }
  uncheckFocustypeskill_input(){
    this.tooltip_type_skill = false;
  }
  checkFocusCO_input(){
    this.tooltip_CO = true;
  }
  uncheckFocusCO_input(){
    this.tooltip_CO = false;
  }

  nationalitychange(){
    if (this.nationality=='Singaporean' || this.nationality=='Malaysian'){
      this.type_candidate_tmp = 'local candidate';
    }
    else{
      this.type_candidate_tmp = 'foreigner';
    }
  }


  include_resume(){
    if(this.free_user){
       const alert = document.createElement('ion-alert');
        alert.cssClass = 'mci-custom-modal-alert';
        alert.header = 'Warning !';
        alert.message = 'Please activate as member to enable key in resume.';
        alert.buttons = [
        {
            text: 'OK',
            role: 'OK',
            cssClass: 'button_click_oa_modal',
          }];
        document.body.appendChild(alert);
        return alert.present();
    }
    else{
      this.storage.set('attachment', true);
      const alert = document.createElement('ion-alert');
      alert.cssClass = 'mci-custom-modal-success';
      alert.header = 'Success';
      alert.message = 'Updated profile successfully.';
      alert.buttons = [
      {
          text: 'OK',
          role: 'OK',
          cssClass: 'button_click_oa_modal',
        }];

      document.body.appendChild(alert);
      return alert.present();
    }
  }


  resumeoption(url_download){
    let $this = this;
    const fileTransfer: FileTransferObject = this.FileTransfer.create();
    fileTransfer.download(url_download, this.file.externalRootDirectory + 'Download/resume.pdf').then((entry) => {
      
      const notif_open = document.createElement('ion-alert');
      notif_open.cssClass = 'mci-custom-modal-success';
      notif_open.header = 'Success';
      notif_open.message = "Open file resume to download.";
      notif_open.buttons = [
      {
              text: 'Close',
               cssClass: 'button_click_oa_modal',
      },
      {
          text: 'Open',
          cssClass: 'button_click_oa_modal',
           handler: () => {
               this.fileOpener.open(this.file.externalRootDirectory + 'Download/resume.pdf', 'application/pdf')
                   .then(() => console.log('File is opened'))
                   .catch(e => $this.mci_config.alert_notif('Error opening file '+ e,false));
             }
        }];
        

      document.body.appendChild(notif_open);
      notif_open.present();
    }, (error) => {
      $this.mci_config.alert_notif("Resume failed to download.",false);
    });
  }

  download_resume(){
    let $this = this;
    let url_download = "http://165.22.111.28/code/candidate_channel/generatePdf/"+ this.id_login
    if (! this.url_attachment){
        $this.resumeoption(url_download)
    }
    else{
      this.downloadoption.open()
    }
    
  }

  downloadoption_inputchange(){
    let url_download = ""
    let $this = this;
    setTimeout(function(){ 
      if($this.downloadoption_input=='2'){
        url_download = "http://165.22.111.28/code/candidate_channel/generatePdf/"+ $this.id_login
      }
      else{
        url_download = $this.url_attachment
      }
      $this.resumeoption(url_download)
    }, 1000);
  }

  update_account(){
    this.mci_config.presentLoading();
    let $this = this;
    let url_update = MciServiceService.api_url+'candidate_channel/edit_profile?'
    url_update= url_update+'id='+ $this.id_login;
    url_update= url_update+'&nationality='+ $this.nationality;
    url_update= url_update+'&candidate_full_name='+ $this.fullname_input;
    url_update= url_update+'&current_location='+ $this.currentlocation_input;
    url_update= url_update+'&type_of_pass='+ $this.typeofpass;
    url_update= url_update+'&levy_type='+ $this.levytype;
    url_update= url_update+'&years_of_sg='+ $this.years_of_singapore;
    url_update= url_update+'&expected_salary='+ $this.expected_salary;
    url_update= url_update+'&type_of_skill='+ $this.typeofskill_input;
    url_update= url_update+'&certificate_obtained='+ $this.cert_input;
    url_update= url_update+'&dormitory_location='+ $this.dormlocation_input;
    url_update= url_update+'&dormitory_status='+ $this.dormstatus_input;
    url_update= url_update+'&work_permit_status='+ $this.workpermit_input;
    url_update= url_update+'&contact='+ $this.number_sg_input;
    url_update= url_update+'&email='+ $this.email_input;
    $this.storage.set('name_login', $this.fullname_input);
    
    
    $this.http.get(url_update)
      .subscribe((data: any) => {
        if (data.code == 200){
            setTimeout(function(){ 
             $this.mci_config.dismissLoading()
             $this.mci_config.success_notif("Your account has been successfully updated.")
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


    if (this.signatureinput) 
    {
      
      let formData = new FormData();
      formData.append('id', this.id_login.toString());
      formData.append('nationality', this.nationality);
      formData.append('signature', this.signatureinput);

      $this.http.post(MciServiceService.api_url+'candidate_channel/post_signature',formData)
        .subscribe((data: any) => {
         }, error => {
              $this.mci_config.alert_notif(error.message,false);
            
        });

    }

    if (this.fileresume_input){
      let formData = new FormData();
      formData.append('id', this.id_login.toString());
      formData.append('nationality', this.nationality);
      formData.append('resume', this.fileresume_input);
       $this.http.post(MciServiceService.api_url+'candidate_channel/multiple_post_resume',formData)
        .subscribe((data: any) => {
         }, error => {
              $this.mci_config.alert_notif(error.message,false);
            
        });  
    }
  }

  logout(){
    this.mci_config.reset_session(false)    
  }

  openchat(){
    this.mci_config.openchat()

  }



  prepare_canvas(){
    this.init();
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'black';
  }

  confirm_sign(){

    if (!this.signaturePad) {
      this.prepare_canvas();
    }
    if(!this.confirm_sign_input){
      this.act_sign_display = 'block';
    }
    else{
        this.act_sign_display = 'none';
    }
      

    
    
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }


  save(): void {
    this.signatureinput = this.signaturePad.toDataURL();
    
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
    else{
      return false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }


  checkfileresume(event){
    let $this = this;
    setTimeout(function(){ 
      let file = event.target.files[0]; 
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        $this.fileresume_input = reader.result.toString().split(',')[1]
      };
      if(this.resume_file_input){
        let name_file = file.name
        if (name_file.length > 25){
            name_file = name_file.substring(0, 25) + '...'
        }
        $this.name_file_resume = name_file;
      }
      else{
        $this.name_file_resume = 'Add a file';
      }
    }, 1000);
  }


}
