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
    { name: 'Dashboard', icon: 'grid-view', path: '/dashboard' },
    { name: 'Ausgaben', icon: 'trending-down', path: '/ausgaben' },
    { name: 'Einnahmen', icon: 'trending-up', path: '/einnahmen' },
    { name: 'Projekte', icon: 'folder', path: '/projekte' },
    { name: 'Sparziele', icon: 'target', path: '/sparziele' },
    { name: 'Übersicht', icon: 'bar-chart', path: '/uebersicht' },
    { name: 'Einstellungen', icon: 'settings', path: '/einstellungen' }
  ];
}