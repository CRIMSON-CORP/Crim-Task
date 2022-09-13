import { Box } from "native-base";
import SidePanelOpenedProvider from "../../utils/contexts/sidePanelOpenedContext";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
function Main() {
    return (
        <Box flex={1} bg="primary.500">
            <SidePanelOpenedProvider>
                <SidePanel />
                <MainPanel />
            </SidePanelOpenedProvider>
        </Box>
    );
}

export default Main;
