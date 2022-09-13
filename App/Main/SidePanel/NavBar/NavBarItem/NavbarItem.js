import React from "react";
import PropTypes from "prop-types";
import { View } from "moti";
import { HStack, Text } from "native-base";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../../../../utils/context";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { useSidePanel } from "../../../../../utils/contexts/sidePanelOpenedContext";
import { useNavigation } from "../../../../../utils/contexts/navigationContext";

function NavbarItem({ icon, text, slug }) {
    const { NavigationRef } = useNavigation();
    const [Active, setActive] = useState(false);
    const { setSidePanelOpened } = useSidePanel();
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", () => {
            setActive(NavigationRef.getCurrentRoute().name === slug);
        });

        return unsub;
    }, []);
    return (
        <View
            animate={{
                opacity: Active ? 1 : 0.6,
                transform: [{ scale: Active ? 1 : 0.95 }],
            }}
        >
            <AnimatedPressable
                onPress={() => {
                    NavigationRef.navigate(slug);
                    setSidePanelOpened(false);
                }}
            >
                <HStack space="8" alignItems="center">
                    {icon}
                    <Text fontSize={24} mt={-1}>
                        {text}
                    </Text>
                </HStack>
            </AnimatedPressable>
        </View>
    );
}

NavbarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    slug: PropTypes.string,
};

export default NavbarItem;
