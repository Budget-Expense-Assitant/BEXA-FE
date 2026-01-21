import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // Pfad anpassen falls nötig

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-container" style="display: flex; min-height: 100vh; background-color: #f8f9fc;">
      
      <app-sidebar></app-sidebar>

      <main style="flex: 1; padding-left: 280px; padding-top: 20px; padding-right: 20px;">
        <router-outlet></router-outlet>
      </main>
      
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {}