import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DeliveryModule, HomeModule, OrderModule } from './modules/';
import { SharedModule } from './shared/shared.module';
import { ValidatorsService } from './services/';
import { ServiceSupportService } from './core/service-support.service';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    JsonpModule,
    DeliveryModule,
    HomeModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [Title, ValidatorsService, ServiceSupportService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
