import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router) {}

  showSidebar(): boolean {
    const hiddenRoutes = ['/login', '/register'];

    return !hiddenRoutes.includes(this.router.url);
  }
}