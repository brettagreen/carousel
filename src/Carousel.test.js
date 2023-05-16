import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right button", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightButton = queryByTestId("right-button");
  fireEvent.click(rightButton);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left button", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel (so that we can use the back button next)
  const rightButton = queryByTestId("right-button");
  fireEvent.click(rightButton);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move back in the carousel
  const leftButton = queryByTestId("left-button");
  fireEvent.click(leftButton);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides back button when showing first image", function() {
  const { queryByTestId } = render(<Carousel />);
  let backButton = queryByTestId("left-button");

  expect(backButton).not.toBeInTheDocument();
  
  fireEvent.click(queryByTestId("right-button"));

  backButton = queryByTestId("left-button");
  expect(backButton).toBeInTheDocument();

});

it("hides forward button when showing last image", function() {
  const { queryByTestId } = render(<Carousel />);
  const forwardButton = queryByTestId("right-button");

  expect(forwardButton).toBeInTheDocument();

  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);

  expect(forwardButton).not.toBeInTheDocument();
})