import { Box } from "native-base";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
function Main() {
    return (
        <Box flex={1} bg="primary.500">
            <SidePanel />
            <MainPanel />
        </Box>
    );
}

export default Main;
