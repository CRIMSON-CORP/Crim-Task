import { Center, Image, Box } from "native-base";
import React from "react";
import profile from "./profile.png";
const ProfilePhoto = () => {
    return (
        <Center size={115}>
            <Box
                w="full"
                h="full"
                borderColor={"#ffffff10"}
                position="absolute"
                rounded="full"
                borderWidth={2}
            />
            <Image
                rounded="full"
                source={profile}
                w={108}
                h={108}
                resizeMode="cover"
                alt="profile"
            />
        </Center>
    );
};

export default ProfilePhoto;
