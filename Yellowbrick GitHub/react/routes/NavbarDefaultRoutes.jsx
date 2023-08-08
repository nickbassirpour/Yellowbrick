import { v4 as uuid } from "uuid";

const NavbarDefault = [
  {
    id: uuid(),
    menuitem: "Dashboard",
    link: "/dashboard",
    roles: ["Admin"],
  },
];

export default NavbarDefault;
