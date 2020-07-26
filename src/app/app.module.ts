import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app-root/app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./app-root/home/home.component";
import { JwtModule } from "@auth0/angular-jwt";
import { tokenGetter } from "./util/helper";
import { PageNotFoundComponent } from "./app-root/page-not-found/page-not-found.component";
import { NavbarComponent } from "./app-root/navbar/navbar.component";
import { FooterComponent } from "./app-root/footer/footer.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
  ],
  exports: [NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //whitelistedDomains: ["example.com"],
        //blacklistedRoutes: ["example.com/examplebadroute/"],
        skipWhenExpired: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
