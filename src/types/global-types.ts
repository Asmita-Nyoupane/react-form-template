export type TSchema =
    {
        name: string,
        fields: TFields[]

    }
export type TFields = {
    name: string,
    type: string,
    label: string,
    placeholder: string,
    options?: {
        value: string,
        label: string
    }[],
    multiple?: boolean,
    validation?: {
        required?: boolean,
        max?: number,
        min?: number,
        pattern?: string
    },
    accept?: string
}
export type TUserProfile = {
    username: string;
    email: string;
    phone: string | null;
    profilePicture: File | null;
    password: string;
    gender: string | null;
    skills: string[];
    bio: string | null;
    age: number | null
};