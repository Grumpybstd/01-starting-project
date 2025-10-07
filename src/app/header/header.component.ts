import { Component } from '@angular/core';
import { AudioComponentComponent } from '../shared/shared/audio.component/audio.component.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [AudioComponentComponent],
})
export class HeaderComponent {}
