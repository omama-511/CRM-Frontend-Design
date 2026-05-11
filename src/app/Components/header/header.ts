import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() isSidebarOpened = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  showLocationModal = false;
  selectedLocationName = 'Multilocation';

  locations = [
    { name: 'DP360 TEST Hawaii Marine - Waianae', dealerId: '#1077', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Sunset', dealerId: '#1679', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Kaimuki', dealerId: '#1690', selected: true },
    { name: 'Hawaii Marine - Kalapana', dealerId: '#1747', selected: true },
  ];

  openLocationModal() { this.showLocationModal = true; }
  closeLocationModal() { this.showLocationModal = false; }

  confirmLocation() {
    const selected = this.locations.filter(l => l.selected);
    if (selected.length === 1) {
      this.selectedLocationName = selected[0].name.split(' - ').pop() || selected[0].name;
    } else if (selected.length > 1) {
      this.selectedLocationName = 'Multilocation';
    } else {
      this.selectedLocationName = 'No Location';
    }
    this.showLocationModal = false;
  }
}
