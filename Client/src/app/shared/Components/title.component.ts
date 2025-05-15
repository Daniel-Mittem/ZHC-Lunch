import { NgClass } from '@angular/common';
import { booleanAttribute, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [ NgClass ],
  template: `
    <h1 [ngClass]="[titleSizeCls()]">
      <ng-content>...</ng-content>
    </h1>
  `,
  styles: `
    .sizeSottotitolo { font-size: 20px; color: #4a5568; margin-bottom: 24px; }
    .sizeTitolo { font-size: 30px; font-weight: 700; margin-bottom: 8px }
    .sizeTesto { font-size: 10px;}
  `
})
export class TitleComponent {
  size = input<'Sottotitolo' | 'Titolo' | 'Testo'>('Testo')
 

  titleSizeCls = computed(() => {
    switch (this.size()) {
      case 'Titolo': return 'sizeTitolo'
      case 'Sottotitolo': return 'sizeSottotitolo'
      default:
      case 'Testo': return 'sizeTesto'
    }
  })
}