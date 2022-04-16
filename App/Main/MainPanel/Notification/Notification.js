import { Box, Image, VStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import TopBar from "../../../Reusables/TopBar";
import no_notification from "./NotificationImages/no_notification.png";
const Notification = () => {
    return (
        <Box flex={1} bg="primary.300">
            <SafeAreaView style={{ flex: 1, padding: 20 }}>
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
            </SafeAreaView>
        </Box>
    );
};

export default Notification;
