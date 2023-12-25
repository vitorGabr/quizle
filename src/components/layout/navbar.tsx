import { Container, styled } from "styled-system/jsx";

export function Navbar() {
	return (
		<styled.nav w="100%">
			<Container display={"flex"} justifyContent="center" alignItems="center">
				<styled.h1
					fontSize={{
						base: "3xl",
						md: "4xl",
					}}
					fontWeight="bold"
					color="white"
				>
					Quizle
				</styled.h1>
			</Container>
		</styled.nav>
	);
}
