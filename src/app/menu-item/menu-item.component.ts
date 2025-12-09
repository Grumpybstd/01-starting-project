import { Component, computed, input, OnInit } from '@angular/core';
import { User } from '../users/user/user.model';
import { MenuItem } from './menu.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent implements OnInit {
  user = input.required<MenuItem>();
  linkName = 'Juliusz';

  imagePath = computed(() => 'users/' + this.user().avatar);
  ngOnInit() {
    // console.log('menuItems in MenuItemComponent : ' + this.user().submenu);
  }
}
