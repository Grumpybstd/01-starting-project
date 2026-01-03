import { Routes } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { NoTaskComponent } from './app/tasks/no-task/no-task.component';
import { UserTasksComponent } from './app/users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './app/tasks/new-task/new-task.component';
import { NotFoundComponent } from './app/notFound/not-found.component';
import { DisplayTextComponentComponent } from './app/display-text.component/display-text.component.component';
import { VideoComponent } from './app/videos/video/video.component';
import { KishWhoComponent } from './app/kish-who/kish-who.component';
import { KishTrainingComponent } from './app/kish-training/kish-training.component';
import { ContactUsComponent } from './app/contact-us/contact-us.component';
import { MemberLoginComponent } from './app/member-login/member-login.component';
import { CommitteeLoginComponent } from './app/committee-login/committee-login.component';
import { CalendarComponent } from './app/calendar/calendar.component';
import { LandingComponent } from './app/landing/landing.component';
import { GalleryComponent } from './app/gallery/gallery.component';
import { DivewithusComponent } from './app/divewithus/divewithus.component';
import { KishphotosComponent } from './app/kishphotos/kishphotos.component';
import { WeatherComponent } from './app/weather/weather.component';
import { MemberComponent } from './app/member/member.component';
import { MeteireannComponent } from './meteireann/meteireann.component';
import { SlackcalcComponent } from './slackcalc/slackcalc.component';
import { MembertrainingComponent } from './app/membertraining/membertraining.component';
import { WindyappComponent } from './app/windyapp/windyapp.component';

export const routes: Routes = [
  {
    path: '', //localhost:4200
    component: LandingComponent,
  },
  {
    path: 'users/:userId/home', //localhost:4200/users/<uiId>
    component: LandingComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'prefix', //prefix or full - prefix =
    //   },
    //   {
    //     path: 'home',
    //     component: LandingComponent,
    //   },

    //   {
    //     // path: 'tasks', //domain/users/:userId/tasks
    //     //component: TasksComponent,
    //     // component: TasksComponent,
    //   },
    //   {
    //     // path: 'tasks/new',
    //     //component: NewTaskComponent,
    //     // component: NewTaskComponent,
    //   },
    // ],
  },

  {
    path: 'users/:userId/dive-with-us',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'dive-with-us',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'dive-with-us',
        component: DivewithusComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'who-we-are',
        component: KishWhoComponent,
      },
    ],
  },
  {
    path: 'users/:userId/who-we-are',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'who-we-are',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'who-we-are',
        component: KishWhoComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },

  {
    path: 'users/:userId/gallery',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'gallery',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'our-training',
        component: KishTrainingComponent,
      },
    ],
  },

  {
    path: 'users/:userId/calendar',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
  {
    path: 'users/:userId/our-training',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'our-training',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'our-training',
        component: KishTrainingComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
  {
    path: 'users/:userId/archive',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'archive',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'archive',
        component: KishWhoComponent,
      },
    ],
  },
  {
    path: 'users/:userId/contact-us',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'contact-us',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
  {
    path: 'users/:userId/memberlogin',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'login',
        component: MemberLoginComponent,
      },
      {
        path: 'member',
        component: MemberComponent,
      },
      {
        path: 'membertraining',
        component: MembertrainingComponent,
      },

      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'our-training',
        component: KishphotosComponent,
      },
    ],
  },
  {
    path: 'users/:userId/committeelogin',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'login',
        component: CommitteeLoginComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
  {
    path: 'users/:userId/weather',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'weather',
        component: WeatherComponent,
      },
      {
        path: 'metEireann',
        component: MeteireannComponent,
      },
      {
        path: 'windyapp',
        component: WindyappComponent,
      },
      {
        path: 'windy',
        redirectTo: 'weather',
        pathMatch: 'prefix',
      },
      {
        path: 'slackcalc',
        component: SlackcalcComponent,
      },
    ],
  },
  {
    path: 'users/:userId/memberlogin',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'member',
        pathMatch: 'prefix', //prefix or full - prefix =
      },
      {
        path: 'member',
        component: MemberComponent,
      },
      {
        path: 'kish-photos',
        component: KishphotosComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
