import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserModule} from './user/user.module';
import {MessengerComponent} from './messenger/messenger.component';
import {DashboardModule} from './dashboard/dashboard.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => DashboardModule
  },
  {
    path: 'chat',
    component: MessengerComponent
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRouting {
}
