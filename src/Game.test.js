import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

	fireEvent.click(drawBtn);
	expect(drawBtn).toHaveTextContent("Pause");
});
