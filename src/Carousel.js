import { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

function Carousel(props) {
  const [cardIdx, setCardIdx] = useState(0);
  const card = props.cardData[cardIdx];
  const total = props.cardData.length;

  const [showBackButton, setBackButton] = useState(false);
  const [showFwdButton, setFwdButton] = useState(true);

  function goForward() {
    console.log('goFwd.cardIdx B4', cardIdx);
    setCardIdx(cardIdx + 1);
    if (cardIdx + 1 === props.cardData.length - 1) {
      setFwdButton(false);
      setBackButton(true);
    } else {
      setFwdButton(true);
      setBackButton(true);
    }
  }

  function goBack() {
    console.log('goBack.cardIdx B4', cardIdx);
    setCardIdx(cardIdx - 1);
     if (cardIdx - 1 === 0) {
      setFwdButton(true);
      setBackButton(false);
    } else {
      setFwdButton(true);
      setBackButton(true);
    }
  }

  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        {showBackButton && <button onClick={goBack} data-testid="left-button">back</button>}
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        {showFwdButton && <button onClick={goForward} data-testid="right-button">fwd</button>}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
