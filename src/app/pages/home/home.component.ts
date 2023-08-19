import { Component } from '@angular/core';
import { IButton } from 'src/app/interfaces/button.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    icon: string = "delete";
    buttonSettings: IButton = {
        text: 'Deletar todos',
        variant: 'danger'
    }

}
