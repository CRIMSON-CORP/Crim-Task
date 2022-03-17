import { Image } from "native-base";
import SplashScreen from "../../assets/crim-task/SplashScreen.png";
import { View } from "moti";
const LoadingScreen = () => {
    return (
        <View
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ transform: [{ translateX: "-100%" }] }}
            style={{ flex: 1 }}
        >
            <Image source={SplashScreen} flex={1} resizeMode={"cover"} alt="SplashScreen" />
        </View>
    );
};

export default LoadingScreen;
