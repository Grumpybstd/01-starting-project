import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  eventTitle: string = '';
  events: any[] = [{ title: 'Kickoff', start: '2025-10-07' }];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    events: this.events,
    eventClick: this.handleEventClick.bind(this), // bind this for method
  };

  addEvent() {
    if (this.selectedDate && this.eventTitle.trim()) {
      const isoDate = this.selectedDate.toISOString().split('T')[0];
      const newEvent = { title: this.eventTitle.trim(), start: isoDate };

      this.events = [...this.events, newEvent];
      this.calendarOptions = { ...this.calendarOptions, events: this.events };

      // reset inputs
      this.eventTitle = '';
      this.selectedDate = null;
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;

    // Ask user if they want to edit or delete
    const action = prompt(
      `Edit the event title or type DELETE to remove it:`,
      event.title
    );

    if (action === null) return; // user cancelled

    if (action.toUpperCase() === 'DELETE') {
      event.remove(); // removes event from calendar
      this.events = this.events.filter(
        (e) => e.title !== event.title || e.start !== event.start
      );
    } else if (action.trim()) {
      event.setProp('title', action.trim());
      // update events array
      const idx = this.events.findIndex(
        (e) => e.start === event.start && e.title === event.title
      );
      if (idx !== -1) this.events[idx].title = action.trim();
    }
  }
}
