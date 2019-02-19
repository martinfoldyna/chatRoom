import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesModule} from './pages/pages.module';
import {AuthModule} from './pages/auth/auth.module';
import {AuthGuard} from './helpers/authGuard.guard';
import {AuthComponent} from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => PagesModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {
}
