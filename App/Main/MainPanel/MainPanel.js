import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { Box, Text } from "native-base";
import { useSelector } from "react-redux";
import TopBar from "./TopBar";
const { width, height } = Dimensions.get("window");
const MainPanel = () => {
    const title = useSelector((state) => state.uiReducer.view);
    return (
        <Box
            position="absolute"
            flex={1}
            bg={"primary.300"}
            p={30}
            style={[
                {
                    paddingTop: StatusBar.currentHeight,
                    borderRadius: 30,
                    transform: [{ translateX: width - 140 }, { scale: 0.75 }],
                },
                StyleSheet.absoluteFill,
            ]}
        >
            <TopBar />
        </Box>
    );
};

export default MainPanel;
