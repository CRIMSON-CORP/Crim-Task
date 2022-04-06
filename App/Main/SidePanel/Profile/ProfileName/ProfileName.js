import { Heading } from "native-base";
import { memo } from "react";
import { useSelector } from "react-redux";
const ProfileName = () => {
    const user = useSelector((state) => state.account);
    return (
        <Heading fontSize={40} lineHeight={51} fontWeight={600}>
            {user?.name?.last} {"\n"}
            {user?.name?.first}
        </Heading>
    );
};

export default memo(ProfileName);
