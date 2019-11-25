import Dashboard from "views/Dashboard/Dashboard.jsx";

//Pages
import User from "views/Pages/Users";
import Model from "views/Pages/Models";
import Types from "views/Pages/Types.jsx";
import Items from "views/Pages/Inventory.jsx";
import UsersType from "views/Pages/UsersType.jsx";


// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import UserIcon from "@material-ui/icons/GroupAdd";
import ComputerIcon from "@material-ui/icons/DesktopMac";
import ListIcon from "@material-ui/icons/List";
import ItemsIcon from "@material-ui/icons/DevicesOther";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "/Users",
    name: "Users",
    icon: UserIcon,
    state: "openForms",
    views: [
      {
        path: "/Users/new",
        name: "New user",
        mini: "NU",
        component: User
      },
      {
        path: "/Users/type",
        name: "User type",
        mini: "UT",
        component: UsersType
      }
    ]
  },
  {
    path: "/Types",
    name: "Types",
    icon: ListIcon,
    component: Types
  },
  {
    path: "/Model",
    name: "Models",
    icon: ComputerIcon,
    component: Model
  },
  {
    path: "/Inventory",
    name: "Inventory",
    icon: ItemsIcon,
    component: Items
  },
];
export default dashRoutes;
