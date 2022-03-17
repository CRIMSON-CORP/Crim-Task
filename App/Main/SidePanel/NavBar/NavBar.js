import { VStack } from "native-base";
import NavbarItem from "./NavBarItem";
import List from "./NabBarIcons/List";
import Category from "./NabBarIcons/Category";
import Settings from "./NabBarIcons/Settings";
const NavBar = () => {
    return (
        <VStack space="5">
            <NavbarItem icon={<List />} text="My Lists" />
            <NavbarItem icon={<Category />} text="Categories" />
            <NavbarItem icon={<Settings />} text="Settings" />
        </VStack>
    );
};

export default NavBar;
