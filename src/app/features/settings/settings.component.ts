import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  bruttoGehalt: number = 3000;
  steuerklasse: string = 'Klasse 1';
  hatKinder: boolean = false;
  anzahlKinder: number = 1;
  hatKirchensteuer: boolean = false;
  showInfo: boolean = false;

  showSteuerklasseDropdown: boolean = false;
  showKinderDropdown: boolean = false;

  steuerklassenOptions = ['Klasse 1', 'Klasse 2', 'Klasse 3'];
  kinderOptions = [1, 2, 3, 4, 5];

  toggleSteuerklasse() {
    this.showSteuerklasseDropdown = !this.showSteuerklasseDropdown;
    this.showKinderDropdown = false;
  }

  toggleKinder() {
    this.showKinderDropdown = !this.showKinderDropdown;
    this.showSteuerklasseDropdown = false;
  }

  selectSteuerklasse(val: string) {
    this.steuerklasse = val;
    this.showSteuerklasseDropdown = false;
  }

  selectKinder(val: number) {
    this.anzahlKinder = val;
    this.showKinderDropdown = false;
  }

  get ersparnisDurchKinder(): number {
    if (!this.hatKinder) return 0;
    const ersparnisProzent = 0.006 + (Math.min(this.anzahlKinder - 1, 4) * 0.0025);
    return this.bruttoGehalt * ersparnisProzent;
  }

  get sozialVersicherung(): number {
    let satz = 0.217; 
    if (this.hatKinder) {
      satz -= (0.006 + (Math.min(this.anzahlKinder - 1, 4) * 0.0025));
    }
    return this.bruttoGehalt * satz;
  }

  get einkommenSteuer(): number {
    let basisSatz = this.steuerklasse === 'Klasse 3' ? 0.09 : 0.15;
    return this.bruttoGehalt * basisSatz;
  }

  get kirchenSteuerBetrag(): number {
    return this.hatKirchensteuer ? (this.einkommenSteuer * 0.09) : 0;
  }

  get gesamtAbzug(): number {
    return this.sozialVersicherung + this.einkommenSteuer + this.kirchenSteuerBetrag;
  }

  get nettoGehalt(): number {
    return this.bruttoGehalt - this.gesamtAbzug;
  }

  saveSettings() {
    alert('Einstellungen erfolgreich gespeichert!');
  }
}