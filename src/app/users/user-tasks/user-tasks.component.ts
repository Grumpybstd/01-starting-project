import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterLink, RouterOutlet],
})
export class UserTasksComponent {
  userId = input.required<string>(); // this will bind to the userId route parameter to the local userId property because of the input decorator withComponentInputBinding
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  uName = '';
  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );

  ngOnInit() {
    // Just to demonstrate that we can also get the route parameter using ActivatedRoute
    console.log(this.activatedRoute); // shows the ActivatedRoute object which we can subscrip to paramMap observable to get the route parameters
    console.log(
      'paramMap out : ' + this.activatedRoute.snapshot.paramMap.get('userId')
    );

    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        console.log('paramMap subscribe : ' + paramMap.get('userId')),
    });
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
