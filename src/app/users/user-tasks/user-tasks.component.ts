import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { type MenuItem } from '../../menu-item/menu.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthUser } from '../../auth/authUser.model';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterLink, RouterOutlet],
})
export class UserTasksComponent implements OnInit {
  isAuthenticated = false;
  userId = input.required<string>(); // this will bind to the userId route parameter to the local userId property because of the input decorator withComponentInputBinding
  authUser!: AuthUser;
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  localMenu: string[] = [];
  uName = '';
  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );
  menuItems = computed<MenuItem>(
    () => this.usersService.menuItems.find((m) => m.id === this.userId())!
  );
  //menu: MenuItem = this.menuItems();

  constructor(
    private authService: AuthService // private authUser: Subscription
  ) {}
  ngOnInit() {
    this.authService.userLoginObservable.subscribe((user) => {
      if (!user) {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
        this.authUser = user;
        console.log('Logged in user from userLoginObservable : ');
        console.log(user);
      }

      // this.isAuthenticated = !!user ? false : true;
    });
    // Just to demonstrate that we can also get the route parameter using ActivatedRoute
    //console.log(this.activatedRoute); // shows the ActivatedRoute object which we can subscrip to paramMap observable to get the route parameters
    // console.log(
    //   'paramMap out : ' + this.activatedRoute.snapshot.paramMap.get('userId')
    // );
    // this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) =>
    //     console.log('paramMap subscribe : ' + paramMap.get('userId')),
    // });
    this.getMenuItems();
    // this.authUser = this.authService.userLogin.subscribe((user) => {
    //   console.log('logged in User from app-user-tasks Comp : ' + user.email);
    // });
  }

  getMenuItems() {
    //console.log('UsersTaskComponent menu items: ' + this.menuItems());
    const menu = this.menuItems();
    if (!menu) {
      console.log('No menu found for userId', this.userId());
      return;
    }
    const subMenu = menu.submenu;
    for (const item of this.menuItems().submenu) {
      console.log('sub-menu item: ' + item.subMenuName);
    }
  }
}
// N.B. the userId property will be populated based on the route parameter because of the input decorator and withComponentInputBinding function in the router provider
// N.B. we could have also used ActivatedRoute to get the route parameter but this is a more modern approach
// N.B. we use computed to create a reactive userName property that will update whenever the userId changes or the users list changes
// N.B. we use the inject function to get an instance of the UsersService
// N.B. we use input.required to make the userId property required, if it is not provided, an error will be thrown
// N.B. we use standalone: true to make this a standalone component
// N.B. we use styleUrl instead of styleUrls because we only have one stylesheet
// N.B. we use templateUrl instead of template because we have a separate HTML file
// N.B. we use selector to define the component's HTML tag
// N.B. we import nothing because this component does not use any other components or directives
// N.B. we could have used a service to get the userId from the route parameters but this is a more modern approach
