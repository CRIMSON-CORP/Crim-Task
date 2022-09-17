import PropTypes from "prop-types";
import { View } from "moti";
import { HStack, Text } from "native-base";
import { useEffect, useState } from "react";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { useSidePanel } from "../../../../../utils/contexts/sidePanelOpenedContext";
import { useNavigation } from "../../../../../utils/contexts/navigationContext";
import { useCallback } from "react";
import { useMemo } from "react";

/**
 * @typedef NavbarItemParams
 * @property {JSX.Element} icon
 * @property {string} text
 * @property {string} slug
 */

/**
 * @param {NavbarItemParams} NavBarItemParams
 * @returns {JSX.Element}
 */
function NavbarItem({ icon, text, slug }) {
    const { NavigationRef } = useNavigation();
    const [active, setActive] = useState(false);
    const { setSidePanelOpened } = useSidePanel();
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", () => {
            setActive(NavigationRef.getCurrentRoute().name === slug);
        });

        return () => {
            unsub();
            setActive(false);
        };
    }, []);

    const navigateToScreen = useCallback(() => {
        NavigationRef.navigate(slug);
        setSidePanelOpened(false);
    }, [slug]);

    const activeState = useMemo(
        () => ({
            opacity: active ? 1 : 0.6,
            transform: [{ scale: active ? 1 : 0.95 }],
        }),
        [active]
    );
    return (
        <View animate={activeState}>
            <AnimatedPressable onPress={navigateToScreen}>
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
