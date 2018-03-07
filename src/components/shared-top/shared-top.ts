import { Component } from '@angular/core';

/**
 * Generated class for the SharedTopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shared-top',
  templateUrl: 'shared-top.html'
})
export class SharedTopComponent {

  text: string;

  constructor() {
    console.log('Hello SharedTopComponent Component');
    this.text = 'Hello World';
  }

}
