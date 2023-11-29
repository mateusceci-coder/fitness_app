import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { homeCards } from "@/constants/homeCards";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const card = homeCards[cardIndex];

  const handlePrevClick = () => {
    const newIndex = cardIndex - 1;
    setCardIndex(newIndex < 0 ? homeCards.length - 1 : newIndex);
  };

  const handleNextClick = () => {
    const newIndex = cardIndex + 1;
    setCardIndex(newIndex >= homeCards.length ? 0 : newIndex);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mb-20">
      <h1 className="my-12 text-center text-5xl text-mainBlue font-playfair">My Fitness App</h1>
      <h2 className="subtitle">
        Your information about crossfit and bodybuilding all in one place
      </h2>
      <div className="flex justify-center items-center">
        <ArrowBigLeft
          size={64}
          strokeWidth={1}
          className="hover:cursor-pointer hover:-translate-x-2"
          onClick={handlePrevClick}
        />
        <div className="mt-20 text-center text-2xl">
          <p className="mb-4">{card.name}</p>
          <ul>
            <Link to={card.page}>
              <li className="relative w-64 sm:w-112 h-128 border-2 rounded-xl hover:cursor-pointer">
                <ul>
                  <li className="absolute inset-0 flex justify-center items-center leading-8 text-white z-10 p-8 text-xl">
                    {card.description}
                  </li>
                </ul>
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={card.image}
                  alt={card.alt}
                />
                <div className="absolute inset-0 rounded-xl bg-black opacity-80"></div>
              </li>
            </Link>
          </ul>
        </div>
        <ArrowBigRight
          size={64}
          strokeWidth={1}
          className="hover:cursor-pointer hover:translate-x-2"
          onClick={handleNextClick}
        />
      </div>
    </section>
  );
}
