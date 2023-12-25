import { ark } from "@ark-ui/react/factory";
import { type HTMLStyledProps, styled } from "styled-system/jsx";
import { button } from "styled-system/recipes";

export const Button = styled(ark.button, button);
export type ButtonProps = HTMLStyledProps<typeof Button>;
