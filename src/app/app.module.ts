import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { HomeComponent } from './views/app-home/app-home.component';
import { UserService } from './services/user.service';
import { HeaderComponent } from './cmps/header/header.component';
import { StatisticsPageComponent } from './views/statistics-page/statistics-page.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { SignupPageComponent } from './views/signup/signup.component';
import { TransferComponent } from './cmps/transfer/transfer.component';
import { MovesComponent } from './cmps/moves/moves.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    HomeComponent,
    HeaderComponent,
    HomeComponent,
    StatisticsPageComponent,
    ChartComponent,
    ContactEditComponent,
    ContactDetailsComponent,
    UserDetailsComponent,
    SignupPageComponent,
    TransferComponent,
    MovesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
