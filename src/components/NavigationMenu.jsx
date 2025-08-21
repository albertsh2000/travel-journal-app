import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import useAuthStore from "../stores/useAuthStore";
import { MENU_KEYS } from "../constants";

const NavigationMenu = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: MENU_KEYS.HOME, label: <Link to={MENU_KEYS.HOME}>Home</Link> },
    {
      key: MENU_KEYS.EXPLORE,
      label: <Link to={MENU_KEYS.EXPLORE}>Explore</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: MENU_KEYS.MY_JOURNAL,
            label: <Link to={MENU_KEYS.MY_JOURNAL}>My Journal</Link>,
          },
          {
            key: MENU_KEYS.ADD_TRIP,
            label: <Link to={MENU_KEYS.ADD_TRIP}>Add Trip</Link>,
          },
          {
            key: MENU_KEYS.LOGOUT,
            label: "Logout",
          },
        ]
      : [
          {
            key: MENU_KEYS.LOGIN,
            label: <Link to={MENU_KEYS.LOGIN}>Login</Link>,
          },
        ]),
  ];

  const handleMenuClick = ({ key }) => {
    if (key === MENU_KEYS.LOGOUT) {
      logout();
      navigate(MENU_KEYS.HOME);
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      items={menuItems}
      selectedKeys={[location.pathname]}
      onClick={handleMenuClick}
    />
  );
};

export default NavigationMenu;
