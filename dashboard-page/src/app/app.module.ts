import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { OntologySectionComponent } from './components/ontology-section/ontology-section.component';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardSectionComponent,
    FooterComponent,
    HeaderComponent,
    OntologySectionComponent,
    SearchSectionComponent,
    UserSectionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
