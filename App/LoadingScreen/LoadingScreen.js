import { Image } from "react-native";
import SplashScreen from "../../assets/crim-task/SplashScreen.png";
import { View } from "moti";
const LoadingScreen = () => {
    return (
        <View
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ transform: [{ translateX: "-100%" }], opacity: 0 }}
            style={{ flex: 1 }}
        >
            <Image
                source={SplashScreen}
                style={{ flex: 1, resizeMode: "cover", width: "100%", height: "100%" }}
                alt="SplashScreen"
            />
        </View>
    );
};

export default LoadingScreen;
