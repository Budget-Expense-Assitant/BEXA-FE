import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  navItems = [
    { name: 'Dashboard', icon: 'grid_view', path: '/dashboard' },
    { name: 'Ausgaben', icon: 'payments', path: '/ausgaben' },
    { name: 'Einnahmen', icon: 'trending_up', path: '/einnahmen' },
    { name: 'Sparziele', icon: 'savings', path: '/sparziele' },
    { name: 'Übersicht', icon: 'leaderboard', path: '/uebersicht' },
    { name: 'Einstellungen', icon: 'settings', path: '/einstellungen' }
  ];

  showLogout: boolean = false;

  toggleLogout(): void {
    this.showLogout = !this.showLogout;
  }

  logout(): void {
    console.log('Benutzer wird abgemeldet...');
    this.showLogout = false;
  }
}
