import { AboutComponent } from './main_module/about/about.component';
import { ContactComponent } from './main_module/contact/contact.component';
import { HomeComponent } from './main_module/home/home.component';
import { Routes } from '@angular/router';
import { ServicesComponent } from './main_module/services/services.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'projects', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    // Add a wildcard route for a 404 page
    { path: '**', redirectTo: '' }
];
