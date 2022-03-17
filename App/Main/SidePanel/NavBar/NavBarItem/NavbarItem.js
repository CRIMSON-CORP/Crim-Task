import { HStack, Text } from "native-base";

const NavbarItem = ({ icon, text }) => {
    return (
        <HStack space="8" alignItems="center">
            {icon}
            <Text fontSize={24} mt={-1}>
                {text}
            </Text>
        </HStack>
    );
};

export default NavbarItem;
