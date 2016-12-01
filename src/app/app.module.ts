import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { DeliveryModule, HomeModule, OrderModule } from './modules/index';
import { ValidatorsService } from './services/validators.service';
import { RepairSharedService } from './services/repair-shared.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DeliveryModule,
    HomeModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [Title, ValidatorsService, RepairSharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
