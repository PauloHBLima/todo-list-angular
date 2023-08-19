import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariants } from './types/buttonVariantes.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() variant: ButtonVariants | null = null;
    @Input()text: string = '';
    @Output() onClick = new EventEmitter<any>();

    emitEvent(event: any){
        this.onClick.emit(event);
    }
}
