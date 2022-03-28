import React, { useContext } from "react";
import { Box, Text } from "native-base";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { FabButtonContext } from "../../../../../utils/context";

const FabCTA = ({ title, onClick }) => {
    const { ToggleOpenFab } = useContext(FabButtonContext);
    return (
        <Box alignItems={"flex-start"}>
            <AnimatedPressable
                style={{ marginTop: 20 }}
                onPress={() => {
                    onClick &&
                        (onClick(),
                        setTimeout(() => {
                            ToggleOpenFab(false);
                        }, 1000));
                }}
            >
                <Text
                    bg="#E81E63"
                    px="30"
                    py="4"
                    rounded="10"
                    fontWeight={"600"}
                    shadow={7}
                    lineHeight={18}
                >
                    {title}
                </Text>
            </AnimatedPressable>
        </Box>
    );
};

export default FabCTA;
