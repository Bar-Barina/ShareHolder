import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { contactResolver } from './services/contact.resolver';
import { HomeComponent } from './views/app-home/app-home.component';
import { StatisticsPageComponent } from './views/statistics-page/statistics-page.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { SignupPageComponent } from './views/signup/signup.component';

const routes: Routes = [
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactIndexComponent,
  },

  {
    path: 'edit/:id',
    component: ContactEditComponent,
    resolve: { contact: contactResolver },
  },
  { path: 'edit', component: ContactEditComponent },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
  {
    path: 'userDetails',
    component: UserDetailsComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
