import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <div class="flex justify-end">
      <button
        [disabled]="disabled"
        [attr.type]="type"
        class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-8 py-2 transition duration-300 text-xl"
      >
        {{ label }}
      </button>
    </div>
    <ng-content></ng-content>
  `,
})
export class ButtonComponent {
  @Input() label: string = 'Invio';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
}

 
 
 
 
 
