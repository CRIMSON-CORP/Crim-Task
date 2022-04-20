import { Input, Text, useTheme, VStack } from "native-base";
import PropTypes from "prop-types";
import { memo } from "react";
const InputBox = ({ header, value, onChangeText }) => {
    const { colors } = useTheme();
    return (
        <VStack bg="#ffffff30" px="5" py="3" rounded="15">
            <Text fontSize={14} opacity={0.6} fontWeight={600}>
                {header}
            </Text>
            <Input
                size="sm"
                fontSize={24}
                px={0}
                color="white"
                variant="unstyled"
                selectionColor={colors.primary.accent}
                value={value}
                onChangeText={onChangeText}
            />
        </VStack>
    );
};

InputBox.propTypes = {
    header: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeText: PropTypes.func,
};

export default memo(InputBox);
