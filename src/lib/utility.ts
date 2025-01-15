import { TFields } from "../types/global-types";

export const validateField = (value: string | string[], data: TFields): string | null => {
    const { validation, label, type } = data;

    // skip validation if required is false
    if (!validation?.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return null;
    }

    // Check for required field
    if (validation?.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return `${label} is required`;
    }

    //  Validate based on type

    if (type === "number") {
        return validateNumber(value, validation, label);
    } else {
        return validateText(value, validation, label);
    }
};

const validateNumber = (value: string | string[], validation: TFields["validation"], label: string): string | null => {
    const numberVal = parseInt(value as string, 10);

    if (validation?.min && numberVal < validation.min) {
        return `${label} must be at least ${validation.min}`;
    }
    if (validation?.max && numberVal > validation.max) {
        return `${label} must not exceed ${validation.max}`;
    }

    return null;
};

const validateText = (value: string | string[], validation: TFields["validation"], label: string): string | null => {
    // Minimum length
    if (validation?.min && value.length < validation.min) {
        return `${label} must be at least ${validation.min} characters`;
    }

    // Maximum length
    if (validation?.max && value.length > validation.max) {
        return `${label} must not exceed ${validation.max} characters`;
    }

    // Pattern validation
    if (validation?.pattern && !new RegExp(validation.pattern).test(value as string)) {
        return `${label} is invalid`;
    }

    return null;
};
