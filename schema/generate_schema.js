import { required } from "../tools/validation.js";

export const generateSchema = {
    'equipmentUsed': {
        validators: [required],
        displayName: "Equipment"
    },
    'timeLimit': {
        validators: [required],
        displayName: "Time Limit"
    },
    'daysWeek': {
        validators: [required],
        displayName: "Days a Week"
    }
};