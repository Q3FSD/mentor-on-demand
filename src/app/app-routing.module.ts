import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './user/signup.component';
import { SigninComponent } from './user/signin.component';
import { ResetComponent } from './user/reset.component';
import { UserComponent } from './user/user.component';
import { MentorComponent } from './mentor/mentor.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'reset/:userName', component: ResetComponent },
  { path: 'user', component: UserComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
