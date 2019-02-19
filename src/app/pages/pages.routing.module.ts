import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {UserModule} from './user/user.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MessengerComponent} from './messenger/messenger.component';
import {DashGuard} from '../helpers/authGuard.guard';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  {
    path: 'dash',
    component: DashboardComponent,
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
