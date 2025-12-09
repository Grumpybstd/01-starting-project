import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { UserComponent } from '../users/user/user.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [UserComponent, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  private usersService = inject(UsersService);
  menu = this.usersService.menuItems;

  ngOnInit(): void {
    // console.log('menu object - ' + this.menu);
  }
}
