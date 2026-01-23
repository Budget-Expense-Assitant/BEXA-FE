import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-wrapper">
      
      <header class="app-header">
        <div class="header-logo-section">
          <span class="logo-text">BEXA</span>
          <div class="logo-divider"></div>
          <div class="logo-subtext">
            Budget EXpense Assistant
          </div>
        </div>
      </header>

      <div class="layout-body">
        <aside class="sidebar-container">
          <app-sidebar></app-sidebar>
        </aside>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss'] // Wir nutzen die SCSS Datei für das Styling
})
export class MainLayoutComponent {}