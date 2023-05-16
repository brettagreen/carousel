import Card from "./Card";
import { render } from "@testing-library/react";


it("renders without crashing", function() {
    render(<Card />);
});

it("matches snapshot", function() {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
