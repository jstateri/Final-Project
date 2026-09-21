export function required(name, value) {
    if (!value) return `'${name}' is a required field.`;
}

export function minLength(min) {
    return (name, value) => {
        if (value && value.length < min) {
            return `'${name}' must be at least ${min} characters.`;
        }
    };
}

export function maxLength(max) {
    return (name, value) => {
        if (value && value.length > max) {
            return `'${name}' must be at most ${max} characters.`;
        }
    };
}

export function validateField(name, value, validators) {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

export function validateSchema(formData, schema) {
    let isValid = true;
    const validated = {};
    const schemaEntries = Object.entries(schema);
    const errorEntries = schemaEntries.map(([key, {validators, displayName}]) => {
        const value = formData.get(key);
        const message = validateField(displayName || key, value, validators) || "";
        if(message) {
            isValid = false;
        } else {
            validated[key] = value;
        }
        return [key, {value, message, error: !!message}];
    });
    const errors = Object.fromEntries(errorEntries);
    return { errors, isValid, validated };
}