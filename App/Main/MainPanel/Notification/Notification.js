import { Box, Image, Text, VStack } from "native-base";
import { StatusBar } from "react-native";
import { TopBarSharedElements } from "../../../../utils/utils";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import TopBar from "../../../Reusables/TopBar";
import no_notification from "./NotificationImages/no_notification.png";
const Notification = () => {
    return (
        <Box flex={1} bg="primary.300" p="5" style={{ paddingTop: StatusBar.currentHeight + 20 }}>
            <VStack space={16} flexGrow={1}>
                <TopBar back />
                <AnimatedText text="Notifications" />
                <VStack flex={1} pb={4} alignItems="center" space="5">
                    <Image
                        source={no_notification}
                        w="full"
                        h={140}
                        alt="no notification"
                        resizeMode="contain"
                    />
                    <Text opacity={50} fontSize={12}>
                        You currently do not have any notificatios
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
};

Notification.sharedElements = () => {
    return TopBarSharedElements;
};

export default Notification;
