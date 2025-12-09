import { MenuItem } from './app/menu-item/menu.model';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'u1',
    name: 'Home ',
    route: 'home',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: false,
        subMenuName: 'NA',
        subMenuRoute: 'NA',
      },
    ],
  },

  {
    id: 'u2',
    name: 'Gallery',
    route: 'gallery',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'kish Photo Album',
        subMenuRoute: 'kish-photos',
      },
      {
        isActive: true,
        subMenuName: 'kish Video Album',
        subMenuRoute: 'gallery',
      },
      {
        isActive: true,
        subMenuName: 'Bubble Makers 2025',
        subMenuRoute: 'our-training',
      },
      // {
      //   isActive: true,
      //   subMenuName: 'Moray Album',
      //   subMenuRoute: 'moray',
      // },
      {
        isActive: true,
        subMenuName: 'Wreck Album',
        subMenuRoute: 'wrecks',
      },
      // {
      //   isActive: true,
      //   subMenuName: 'Dalkey & Muglins Album',
      //   subMenuRoute: 'dalkeyMuglins',
      // },
    ],
  },
  // {
  //   id: 'u3',
  //   name: 'Bubble Makers 2025',
  //   route: 'our-training',
  //   avatar: 'kish-house.svg',
  //   submenu: [
  //     {
  //       isActive: true,
  //       subMenuName: 'Bubble Makers 2024',
  //       subMenuRoute: 'bubblemakers1',
  //     },
  //     {
  //       isActive: true,
  //       subMenuName: 'Bubble Makers 2025',
  //       subMenuRoute: 'bubbleakers2',
  //     },
  //   ],
  // },
  {
    id: 'u4',
    name: 'Dive With Us ',
    route: 'dive-with-us',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'Our History',
        subMenuRoute: 'who-we-are',
      },
      {
        isActive: true,
        subMenuName: 'Try Dive Details',
        subMenuRoute: 'divewithUs',
      },
      {
        isActive: true,
        subMenuName: 'D1* D2** Programme Details',
        subMenuRoute: 'divewithUs2',
      },
      // {
      //   isActive: true,
      //   subMenuName: 'D2* Programme Details',
      //   subMenuRoute: 'divewithUs3',
      // },
      {
        isActive: true,
        subMenuName: 'Full Programme List',
        subMenuRoute: 'divewithUs4',
      },
      // {
      //   isActive: true,
      //   subMenuName: 'Crossover Programme (PADI,BSAC) ',
      //   subMenuRoute: 'divewithUs5',
      // },
      {
        isActive: true,
        subMenuName: 'Upcoming Schedule',
        subMenuRoute: 'divewithUs6',
      },
    ],
  },
  // {
  //   id: 'u5',
  //   name: 'Our History',
  //   route: 'who-we-are',
  //   avatar: 'kish-house.svg',
  //   submenu: [
  //     {
  //       isActive: true,
  //       subMenuName: 'Further History',
  //       subMenuRoute: 'historyRoute1',
  //     },
  //     {
  //       isActive: true,
  //       subMenuName: 'Submit Entry',
  //       subMenuRoute: 'historyRoute1',
  //     },
  //   ],
  // },
  {
    id: 'u6',
    name: 'Calendar',
    route: 'calendar',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'Submit Addition',
        subMenuRoute: 'calendarRoute1',
      },
      {
        isActive: true,
        subMenuName: 'Amend Entry',
        subMenuRoute: 'calendarRoute2',
      },
    ],
  },
  // {
  //   id: 'u6',
  //   name: 'Our Training',
  //   route: 'our-training',
  //   avatar: 'kish-house.svg',
  // },
  // {
  //   id: 'u7',
  //   name: 'Archive',
  //   route: 'archive',
  //   avatar: 'kish-house.svg',
  // },
  {
    id: 'u7',
    name: 'Weather',
    route: 'weather',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'Met Eireann',
        subMenuRoute: 'metEireann',
      },
      {
        isActive: true,
        subMenuName: 'Windy.com',
        subMenuRoute: 'windy',
      },
      {
        isActive: true,
        subMenuName: 'Tide Calculation',
        subMenuRoute: 'slackcalc',
      },
    ],
  },

  {
    id: 'u8',
    name: 'Member Login',
    route: 'memberlogin',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'Logout',
        subMenuRoute: 'membersRoute1',
      },
      {
        isActive: true,
        subMenuName: 'Members Training',
        subMenuRoute: 'membersRoute2',
      },
    ],
  },

  {
    id: 'u9',
    name: 'Contact Us',
    route: 'contact-us',
    avatar: 'kish-house.svg',
    submenu: [
      {
        isActive: true,
        subMenuName: 'Key Contacts',
        subMenuRoute: 'key-contacts1',
      },
      {
        isActive: true,
        subMenuName: 'Committee Contacts',
        subMenuRoute: 'key-contacts2',
      },
    ],
  },
];
// {
//     id: 'u10',
//     name: 'Committee Login',
//     route: 'committeelogin',
//     avatar: 'kish-house.svg',
//   },
