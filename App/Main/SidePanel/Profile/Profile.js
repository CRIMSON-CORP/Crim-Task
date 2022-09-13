import { VStack } from "native-base";
import ProfileName from "./ProfileName";
import ProfilePhoto from "./ProfilePhoto";
function Profile() {
    return (
        <VStack space={12}>
            <ProfilePhoto />
            <ProfileName />
        </VStack>
    );
}

export default Profile;
