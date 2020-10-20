import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'list-job',
    loadChildren: () => import('./list-job/list-job.module').then( m => m.ListJobPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'find-job',
    loadChildren: () => import('./find-job/find-job.module').then( m => m.FindJobPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'detail-job',
    loadChildren: () => import('./detail-job/detail-job.module').then( m => m.DetailJobPageModule)
  },
  {
    path: 'apply-job',
    loadChildren: () => import('./apply-job/apply-job.module').then( m => m.ApplyJobPageModule)
  },
  {
    path: 'done-job',
    loadChildren: () => import('./done-job/done-job.module').then( m => m.DoneJobPageModule)
  },
  {
    path: 'homehome',
    loadChildren: () => import('./homehome/homehome.module').then( m => m.HomehomePageModule)
  },
  {
    path: 'list-candidate',
    loadChildren: () => import('./list-candidate/list-candidate.module').then( m => m.ListCandidatePageModule)
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./make-payment/make-payment.module').then( m => m.MakePaymentPageModule)
  },
  {
    path: 'needloginaccount',
    loadChildren: () => import('./needloginaccount/needloginaccount.module').then( m => m.NeedloginaccountPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
