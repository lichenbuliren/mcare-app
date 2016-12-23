import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { NavbarComponent } from './navbar/navbar.component';
import { ApiConfig, ConstConfig } from './config';
import { ServiceSupportService } from './service-support.service';


@NgModule({
  imports: [CommonModule],
  exports: [HttpModule, JsonpModule, NavbarComponent],
  declarations: [NavbarComponent],
  // 这里注册全局的单例配置服务
  providers: [ServiceSupportService, {
    provide: 'ApiConfig',
    useValue: ApiConfig
  }, {
    provide: 'ConstConfig',
    useValue: ConstConfig
  }],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
