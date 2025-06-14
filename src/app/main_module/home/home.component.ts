import { Component } from '@angular/core';
import { FooterComponent } from "../../common_content/footer/footer.component";
import { HeaderComponent } from "../../common_content/header/header.component";
import { MyServicesComponent } from "../../common_content/my-services/my-services.component";

@Component({
    selector: 'app-home',
    imports: [MyServicesComponent, HeaderComponent],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
