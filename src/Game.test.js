import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Game from "./Game";

test("renders without crashing", () => {
	render(<Game />);
});
it("matches snapshot", function() {
	const { asFragment } = render(<Game />);
	expect(asFragment()).toMatchSnapshot();
});

it("can start draw cards", function() {
	const { queryByAltText, getByText } = render(<Game />);
	const drawBtn = getByText("Draw Cards");
	const card = queryByAltText("card");
	expect(card).not.toBeInTheDocument();
	fireEvent.click(drawBtn);
	setTimeout(() => {
		expect(card).toBeInTheDocument();
	}, 2000);
	expect(drawBtn).toHaveTextContent("Pause");
});
