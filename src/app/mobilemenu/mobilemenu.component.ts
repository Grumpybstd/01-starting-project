import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-mobilemenu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './mobilemenu.component.html',
  styleUrl: './mobilemenu.component.css',
})
export class MobilemenuComponent implements OnInit {
  private usersService = inject(UsersService);
  menu = this.usersService.menuItems;

  ngOnInit(): void {
    // console.log('menu object - ' + this.menu);
  }
  // mobileMenuElement = document.querySelector('.mobile-menu-items');
  constructor() {}

  toggleMobileMenu() {
    console.log('Toggle menu clicked');
    const mobileMenuElement = document.querySelector('.mobile-menu-items');
    mobileMenuElement?.classList.toggle('active');
  }
}
