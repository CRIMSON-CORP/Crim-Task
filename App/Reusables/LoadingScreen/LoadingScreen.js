import { Image } from "native-base";
import { Dimensions } from "react-native";
import SplashImage from "../../../assets/crim-task/SplashScreen.png";

const { width, height } = Dimensions.get("screen");

function LoadingScreen() {
    return (
        <Image
            width={width}
            height={height}
            resizeMode="cover"
            fadeDuration={0}
            source={SplashImage}
            resizeMethod="resize"
            alt="splash-screen-loading"
        />
    );
}

export default LoadingScreen;
