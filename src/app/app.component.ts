import { AboutComponent } from './main_module/about/about.component';
import { Component } from '@angular/core';
import { ContactComponent } from './main_module/contact/contact.component';
import { FooterComponent } from "./common_content/footer/footer.component";
import { HeaderComponent } from "./common_content/header/header.component";
import { HomeComponent } from './main_module/home/home.component';
import { MyServicesComponent } from "./common_content/my-services/my-services.component";
import { RouterOutlet } from '@angular/router';
import { ServicesComponent } from './main_module/services/services.component';
import { ToolbarComponent } from "./common_content/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, MyServicesComponent, HeaderComponent, ToolbarComponent, HomeComponent, AboutComponent, ContactComponent, ServicesComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swapnasheela_portfolio';
}
