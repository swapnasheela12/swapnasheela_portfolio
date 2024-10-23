import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./common_content/footer/footer.component";
import { MyServicesComponent } from "./common_content/my-services/my-services.component";
import { HeaderComponent } from "./common_content/header/header.component";
import { ToolbarComponent } from "./common_content/toolbar/toolbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MyServicesComponent, HeaderComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swapnasheela_portfolio';
}
