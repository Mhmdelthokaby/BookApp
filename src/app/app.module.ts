import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { CategoryComponent } from './pages/home/category/category.component';
import { LastBooksComponent } from './pages/home/last-books/last-books.component';
import { AtlasComponent } from './components/pages/atlas/atlas.component';
import { ExtractsComponent } from './components/pages/extracts/extracts.component';
import { DictionariesComponent } from './components/pages/dictionaries/dictionaries.component';
import { EncyclopediasComponent } from './components/pages/encyclopedias/encyclopedias.component';
import { BiographyComponent } from './components/pages/biography/biography.component';
import { TranslationsComponent } from './components/pages/translations/translations.component';
import { YearbooksComponent } from './components/pages/yearbooks/yearbooks.component';
import { GuidanceNotesComponent } from './components/pages/guidance-notes/guidance-notes.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    NotFoundComponent,
    HeroComponent,
    CategoryComponent,
    LastBooksComponent,
    AtlasComponent,
    ExtractsComponent,
    DictionariesComponent,
    EncyclopediasComponent,
    BiographyComponent,
    TranslationsComponent,
    YearbooksComponent,
    GuidanceNotesComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
