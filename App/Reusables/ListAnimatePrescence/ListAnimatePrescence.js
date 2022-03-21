import { View } from "moti";
import PropTypes from "prop-types";
const ListAnimatePrescence = ({ children, height, spacing }) => {
    return (
        <View
            from={{
                marginBottom: -height,
            }}
            animate={{
                marginBottom: spacing,
            }}
            exit={{
                marginBottom: -height,
            }}
        >
            {children}
        </View>
    );
};
ListAnimatePrescence.propTypes = {
    height: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
};
export default ListAnimatePrescence;
