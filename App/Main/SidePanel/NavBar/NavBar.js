import { VStack } from "native-base";
import NavbarItem from "./NavBarItem";
import List from "./NabBarIcons/List";
import Category from "./NabBarIcons/Category";
import Settings from "./NabBarIcons/Settings";
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
