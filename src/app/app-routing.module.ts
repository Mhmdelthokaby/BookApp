import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AtlasComponent } from './components/pages/atlas/atlas.component';
import { ExtractsComponent } from './components/pages/extracts/extracts.component';
import { DictionariesComponent } from './components/pages/dictionaries/dictionaries.component';
import { EncyclopediasComponent } from './components/pages/encyclopedias/encyclopedias.component';
import { BiographyComponent } from './components/pages/biography/biography.component';
import { TranslationsComponent } from './components/pages/translations/translations.component';
import { YearbooksComponent } from './components/pages/yearbooks/yearbooks.component';
import { GuidanceNotesComponent } from './components/pages/guidance-notes/guidance-notes.component';

import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component'; // ✅ Import LoginComponent
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './pages/register/register.component'; // ✅ Import RegisterComponent


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // ✅ Here
  { path: 'atlas', component: AtlasComponent },
  { path: 'extracts', component: ExtractsComponent },
  { path: 'dictionaries', component: DictionariesComponent },
  { path: 'encyclopedias', component: EncyclopediasComponent },
  { path: 'biography', component: BiographyComponent },
  { path: 'translations', component: TranslationsComponent },
  { path: 'yearbooks', component: YearbooksComponent },
  { path: 'guidance-notes', component: GuidanceNotesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
