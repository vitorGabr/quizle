export type Word = {
    letter: string;
    status: "valid" | "invalid" | "checking" | "unchecked";
};