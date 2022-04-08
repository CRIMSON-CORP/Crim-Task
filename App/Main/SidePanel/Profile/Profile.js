import { Box, VStack } from "native-base";
import ProfilePhoto from "./ProfilePhoto";
import ProfileName from "./ProfileName";
const Profile = () => {
    return (
        <VStack space={12}>
            <ProfilePhoto />
            <ProfileName />
        </VStack>
    );
};

export default Profile;
