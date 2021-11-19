import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Storage } from '@ionic/storage';
import { AuthenGuardService } from './services/authen-guard.service';
import { AuthenticationService } from './services/authentication.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Storage, 
    AuthenticationService, 
    AuthenGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , BarcodeScanner, Base64ToGallery
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
