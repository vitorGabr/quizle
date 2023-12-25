import { LetterStatus } from "@/schemas/word-schema";
import { Center, styled } from "styled-system/jsx";
import { SystemStyleObject } from "styled-system/types";

export const Letter = styled(Center, {
	base: {
		borderWidth: "2px",
		borderColor: "bg.muted",
		bgColor: "transparent",
		rounded: "xl",
		w: "12",
		h: "12",
		color: "white",
		fontSize: "xl",
		fontWeight: "bold",
		_selected: {
			borderWidth: "2px",
			borderColor: "fg.subtle",
		},
		cursor: "pointer",
		userSelect: "none",
	},
	variants: {
		status: {
			correct: {
				borderColor: "letterStatus.correct",
				_selected: {
					borderColor: "letterStatus.correct",
				},
			},
			incorrect: {
				bgColor: "letterStatus.incorrect",
				borderColor: "letterStatus.incorrect",
				_selected: {
					borderColor: "letterStatus.incorrect",
				},
			},
			unanswered: {
				borderColor: "letterStatus.unanswered",
				borderStyle: "dashed",
				_selected: {
					borderColor: "letterStatus.unanswered",
				},
			},
		} as {
			[key in LetterStatus]: SystemStyleObject;
		},
	},
});
