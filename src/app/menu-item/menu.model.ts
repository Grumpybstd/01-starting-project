export interface MenuItem {
  id: string;
  name: string;
  route: string;
  avatar: string;
  submenu: {
    isActive: boolean;
    subMenuName: string;
    subMenuRoute: string;
  }[];
}
