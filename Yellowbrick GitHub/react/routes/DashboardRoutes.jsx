// import React from "react";
import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 * 				: Object - Icon as an object added from v1.4.0.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */


export const DashboardMenu = [

  {
    id: uuid(),
    title: "Admin",
    icon: "home",
    roles: ["Admin"],
    children: [
      {
        id: uuid(),
        link: "/dashboard/admin",
        name: "Admin Dashboard",
        roles: ["Admin"],
        },
        {
        id: uuid(),
        link: "/admin-invite",
        name: "Invite New User",
        roles: ["Admin"],
        },
        {
         id: uuid(),
         link: "/users",
         name: "User List",
         roles: ["Admin"],
        },

    ],
  },
  {
    id: uuid(),
    title: "Advisors",
    icon: "book-open",
    roles: ["Advisor", "Admin"],
    children: [
      {
        id: uuid(),
        link: "/dashboard/advisor",
        name: "Advisor Dashboard",
        roles: ["Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/advisor/calendar",
        name: "Calendar",
        roles: ["Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/advisor/team",
        name: "Sales Team",
        roles: ["Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/advisor/training",
        name: "Training",
        roles: ["Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/advisor/meetings",
        name: "Meetings",
        roles: ["Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/advisor/sales",
        name: "Total Sales",
        roles: ["Admin", "Advisor"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Agents",
    icon: "book",
    roles: ["Agent", "Admin", "Advisor"],
    children: [
      {
        id: uuid(),
        link: "/dashboard/agent",
        name: "Agent Dashboard",
        roles: ["Agent", "Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/agent/calendar",
        name: "Calendar",
        roles: ["Agent", "Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/agent/meetings",
        name: "Scheduled Meetings",
        roles: ["Agent", "Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/agent/processing",
        name: "In Processing",
        roles: ["Agent", "Admin", "Advisor"],
      },
      {
        id: uuid(),
        link: "/agent/reviews",
        name: "Reviews",
        roles: ["Agent", "Admin", "Advisor"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Clients",
    icon: "user",
    roles: ["Advisor", "Admin", "Agent", "Client"],
    children: [
      {
        id: uuid(),
        link: "/dashboard/client",
        name: "Client Dashboard",
        roles: ["Advisor", "Admin", "Agent", "Client"],
      },
      {
        id: uuid(),
        link: "/clients",
        name: "Clients",
        roles: ["Advisor", "Agent", "Admin", "Client"],
      },
      {
        id: uuid(),
        link: "/clients/new",
        name: "Add Client",
        roles: ["Advisor", "Admin", "Agent", "Client"],
      },
      {
        id: uuid(),
        link: "/clients/new/PersonalInformation",
        name: "Personal Information",
        roles: ["Advisor", "Admin", "Agent", "Client"],
      },
    ],
  },

];

export default DashboardMenu;
