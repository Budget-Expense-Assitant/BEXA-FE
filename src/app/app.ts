import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'bexa-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet]
})
export class App {
  protected readonly title = signal('bexa');
}
