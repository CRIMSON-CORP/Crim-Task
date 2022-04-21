import { VStack } from "native-base";
import Category from "./NabBarIcons/Category";
import List from "./NabBarIcons/List";
import Settings from "./NabBarIcons/Settings";
import NavbarItem from "./NavBarItem";
const NavBar = () => {
    return (
        <VStack space="5">
            <NavbarItem icon={<List />} text="My Lists" slug="lists" />
            <NavbarItem icon={<Category />} text="Categories" slug="categories" />
            <NavbarItem icon={<Settings />} text="Settings" slug="settings" />
        </VStack>
    );
};

export default NavBar;
