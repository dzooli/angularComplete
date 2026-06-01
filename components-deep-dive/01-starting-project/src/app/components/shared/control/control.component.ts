import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()', // declare a listener to the host element (recommended way)
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; // deprecated alternative way to add class to the host element
  
  // Alternatively define a deprecated way to add a listener to the host element
  // @HostListener('click') onClick() {
  //   console.log('Control component clicked');
  // }

  label = input.required<string>();
  target = input.required<string>();

  onClick() {
    console.log('Control component clicked');
  }
}
