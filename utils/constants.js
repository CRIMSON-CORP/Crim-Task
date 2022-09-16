import PropTypes from "prop-types";
export const CRIM_TASK_STORAGE_KEY = "crim-task-data";

export const categoryColors = [
    "#D002F5",
    "#FFFFFF",
    "#E91E63",
    "#00CB53",
    "#602EA5",
    "#FF7F50",
    "#E7B400",
    "#D60606",
    "#9932CC",
    "#3D5AFE",
    "#FFD700",
    "#40C4FF",
    "#1DE9B6",
    "#00C853",
    "#76FF03",
    "#EEFF41",
    "#FF6F00",
];

export const categoryNameExamples = [
    "Travel",
    "Health",
    "Sports",
    "Gym",
    "Groceries",
    "Important",
    "Work",
    "Bucket List",
    "School",
    "Hobbies",
    "Personal",
];

export const childrenPropTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};
