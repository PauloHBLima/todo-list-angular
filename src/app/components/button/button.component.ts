import { Component, Input } from '@angular/core';
import { ButtonVariants } from './types/buttonVariantes.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() variant: ButtonVariants | null = null;
    @Input()text: string = '';
}
