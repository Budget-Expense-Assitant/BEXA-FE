import { Component, signal } from '@angular/core';

@Component({
  selector: 'bexa-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bexa');
}
