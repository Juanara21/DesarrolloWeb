import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AsideComponent } from './components/layout/aside/aside.component';
import { ContentQuienesomosComponent } from './components/layout/content-quienesomos/content-quienesomos.component';
import { ContentCatalogoComponent } from './components/layout/content-catalogo/content-catalogo.component';
import { ContentNosotrosComponent } from './components/layout/content-nosotros/content-nosotros.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
{ path:'quienessomos',component:ContentQuienesomosComponent}
{ path:'nosotros',component:ContentNosotrosComponent}
{ path:'catologo',component:ContentCatalogoComponent}
{ path:'',component:ContentComponent}


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    AsideComponent,
    ContentQuienesomosComponent,
    ContentCatalogoComponent,
    ContentNosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
