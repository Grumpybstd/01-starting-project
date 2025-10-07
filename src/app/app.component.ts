import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';
import { AudioComponentComponent } from './shared/shared/audio.component/audio.component.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    UsersComponent,
    RouterOutlet,
    AudioComponentComponent,
    MenuComponent,
  ],
})
export class AppComponent {}
