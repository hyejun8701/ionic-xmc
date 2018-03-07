import { Component } from '@angular/core';

/**
 * Generated class for the TopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'top',
  templateUrl: 'top.html'
})
export class TopComponent {

  text: string;

  constructor() {
    console.log('Hello TopComponent Component');
    this.text = 'Hello World';
  }

}
