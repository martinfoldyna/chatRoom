import {RouterModule, Routes} from '@angular/router';
import {UserInfoComponent} from './user-info/user-info.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'info',
    component: UserInfoComponent
  },
  {
    path: '',
    redirectTo: 'pages/user/info'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRouting {
}
