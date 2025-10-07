import { Injectable } from '@angular/core';

import { DUMMY_USERS } from '../../dummy-users';
import { MENU_ITEMS } from '../../menu-items';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get users() {
    return DUMMY_USERS;
  }
  get menuItems() {
    return MENU_ITEMS;
  }
}
