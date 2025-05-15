import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <img
      [src]="src"
      [alt]="alt"
      [style.width]="width"
      [style.height]="height"
      class="object-contain"
    />
  `,
})
export class LogoComponent {
  @Input() width: string = 'auto'; 
  @Input() height: string = 'auto';
  @Input() src: string = 'assets/zucchetti-logo.png';
  @Input() alt: string = 'Zucchetti Logo';
}

