import { required, minLength, maxLength } from "../tools/validation.js";

export const userSchema = {
    'username': {
        validators: [required, minLength(3), maxLength(20)],
        displayName: "Username"
    },
    'password': {
        validators: [required, minLength(3), maxLength(20)],
        displayName: "password"
    }
};