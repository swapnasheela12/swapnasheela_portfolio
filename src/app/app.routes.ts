// import { AboutComponent } from './main_module/about/about.component';
// import { ContactComponent } from './main_module/contact/contact.component';
// import { HomeComponent } from './main_module/home/home.component';
// import { ProjectComponent } from './main_module/project/project.component';
// import { ResumeComponent } from './main_module/resume/resume.component';
import { Routes } from '@angular/router';
// import { ServicesComponent } from './main_module/services/services.component';

// export const routes: Routes = [
//     { path: 'home', component: HomeComponent },
//     { path: 'about', component: AboutComponent },
//     { path: 'services', component: ServicesComponent },
//     { path: 'resume', component: ResumeComponent },
//     { path: 'project', component: ProjectComponent },
//     { path: 'contact', component: ContactComponent },
//     // Add a wildcard route for a 404 page
//     { path: '**', redirectTo: 'home', pathMatch: 'full' }
// ];


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./main_module/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./main_module/about/about.component').then((m) => m.AboutComponent),
    },
    {
        path: 'services',
        loadComponent: () =>
            import('./main_module/services/services.component').then((m) => m.ServicesComponent),
    },
    {
        path: 'resume',
        loadComponent: () =>
            import('./main_module/resume/resume.component').then((m) => m.ResumeComponent),
    },
    {
        path: 'project',
        loadComponent: () =>
            import('./main_module/project/project.component').then((m) => m.ProjectComponent),
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./main_module/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
