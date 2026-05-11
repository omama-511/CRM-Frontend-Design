import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  private intervalId: any;

  // Stores selected lead details safely
  selectedLead: any = null;
  activeTab: string = 'Lead Detail';
  editingFields: any = {};
  showLocationModal = false;
  showTransferModal = false;
  showroomTooltip = false;

  openTransferModal() {
    this.showTransferModal = true;
  }

  closeTransferModal() {
    this.showTransferModal = false;
  }

  locations = [
    { name: 'DP360 TEST Hawaii Marine - Waianae', dealerId: '#1077', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Sunset', dealerId: '#1679', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Kaimuki', dealerId: '#1690', selected: true },
    { name: 'Hawaii Marine - Kalapana', dealerId: '#1747', selected: true },
  ];

  toggleEdit(field: string) {
    this.editingFields[field] = !this.editingFields[field];
  }

  showAddEventModal = false;
  events: any[] = [
    {
      type: 'Sales Appointment',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    },
    {
      type: 'Phone Call Out',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    }
  ];
  newEvent = {
    type: 'Sales Appointment',
    status: 'Scheduled',
    salesPerson: 'M.Mahsam Abbas',
    department: 'Sales',
    description: '',
    date: 'May 09, 2026',
    startTime: '09:15 PM',
    endTime: '09:30 PM'
  };

  onAddEvent() {
    this.showAddEventModal = true;
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
  }

  saveEvent() {
    this.events.push({ ...this.newEvent });
    this.closeAddEventModal();
    // Reset form
    this.newEvent = {
      type: 'Sales Appointment',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    };
  }

  deleteEvent(index: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events.splice(index, 1);
    }
  }

  editEvent(index: number) {
    this.newEvent = { ...this.events[index] };
    this.showAddEventModal = true;
    // For now this just re-adds, we could make it update instead by tracking index
  }

  openLocationModal() {
    this.showLocationModal = true;
  }

  closeLocationModal() {
    this.showLocationModal = false;
  }

  confirmLocation() {
    const selected = this.locations.filter(l => l.selected);
    if (selected.length === 1) {
      this.selectedLead.customerAt = selected[0].name.split(' - ').pop() || selected[0].name;
    } else if (selected.length > 1) {
      this.selectedLead.customerAt = 'Multilocation';
    }
    this.showLocationModal = false;
  }

  leads = [
    { id: 1, name: 'Alice Johnson', type: 'Web Lead', email: 'alice.j@cloudnet.com', assignee: 'Robert Fox', status: 'Active', time: 'May 04, 2026 11:20 AM', source: 'Website' },
    { id: 2, name: 'Bob Williams', type: 'Phone Call', email: 'bob.w@gmail.com', assignee: 'Unassigned', status: 'New', time: 'May 04, 2026 10:45 AM', source: 'Inbound' },
    { id: 3, name: 'Charlie Davis', type: 'Referral', email: 'charlie.d@techcorp.io', assignee: 'Jane Cooper', status: 'Sold', time: 'May 03, 2026 02:15 PM', source: 'Partner' },
    { id: 4, name: 'Diana Prince', type: 'Web Lead', email: 'diana.p@amazonia.com', assignee: 'Robert Fox', status: 'Archive', time: 'May 02, 2026 09:00 AM', source: 'Facebook' },
    { id: 5, name: 'Bob Smith', type: 'Web Lead', email: 'bob.j@cloudnet.com', assignee: 'Robert Fox', status: 'Active', time: 'May 04, 2026 11:20 AM', source: 'Website' },
    { id: 6, name: 'Williams Robert', type: 'Phone Call', email: 'williams.w@gmail.com', assignee: 'Unassigned', status: 'New', time: 'May 04, 2026 10:45 AM', source: 'Inbound' },
    { id: 7, name: 'Robert Davis', type: 'Referral', email: 'robert.d@techcorp.io', assignee: 'Jane Cooper', status: 'Sold', time: 'May 03, 2026 02:15 PM', source: 'Partner' },
    { id: 8, name: 'Diana Smith', type: 'Web Lead', email: 'diana.p@amazonia.com', assignee: 'Robert Fox', status: 'Archive', time: 'May 02, 2026 09:00 AM', source: 'Facebook' },
    { id: 9, name: 'Alice Williams', type: 'Web Lead', email: 'alice.j@cloudnet.com', assignee: 'Robert Fox', status: 'Active', time: 'May 04, 2026 11:20 AM', source: 'Website' },
    { id: 10, name: 'Robert Williams', type: 'Phone Call', email: 'robert.w@gmail.com', assignee: 'Unassigned', status: 'New', time: 'May 04, 2026 10:45 AM', source: 'Inbound' },
    { id: 11, name: 'Charlie Thomas', type: 'Referral', email: 'charlie.d@techcorp.io', assignee: 'Jane Cooper', status: 'Sold', time: 'May 03, 2026 02:15 PM', source: 'Partner' },
    { id: 12, name: 'Ruro Smith', type: 'Web Lead', email: 'ruro.p@amazonia.com', assignee: 'Robert Fox', status: 'Archive', time: 'May 02, 2026 09:00 AM', source: 'Facebook' }
  ];

  // Handles lead selection
  selectLead(lead: any) {
    const initials = lead.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();

    this.selectedLead = {
      name: lead.name,
      initials,
      type: lead.type,
      email: lead.email,
      status: lead.status,
      salesRep: lead.assignee !== 'Unassigned' ? lead.assignee : 'Not Assigned',
      modifiedDate: lead.time,
      source: lead.source,
      soldStatus: lead.status === 'Sold' ? 'Sold' : 'Not Sold',
      customerAt: 'Showroom',
      phone: '+1 (555) 019-2837',
      location: 'New York, NY',
      createdDate: 'May 01, 2026',
      step: 'Write Up',
      leadAge: '3 Days',
      originator: 'System',
      originatorSub: 'Auto-assigned',
      confidence: 'High',
      department: 'Sales',
      purchase: 'Within 30 Days'
    };
  }

  // Handle tab clicks
  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  ngOnInit() {
    if (this.leads && this.leads.length > 0) {
      this.selectLead(this.leads[0]);
    }

    // Updates current date every minute
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 60000);
  }

  ngOnDestroy() {
    // Prevent memory leak
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}