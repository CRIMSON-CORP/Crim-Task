import { Box } from "native-base";
import { StatusBar } from "react-native";
const ScreenPaddingWrapper = ({ children, noFlex }) => {
    return (
        <Box p="5" style={{ paddingTop: StatusBar.currentHeight + 10 }} flex={noFlex ? 0 : 1}>
            {children}
        </Box>
    );
};

export default ScreenPaddingWrapper;
