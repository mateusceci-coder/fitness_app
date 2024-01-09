import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { homeCards } from "@/constants/homeCards";
import { Link } from "react-router-dom";

export default function CarouselDemo() {
  const cardProfile = homeCards[0];
  const cardExercise = homeCards[1];
  const cardWorkout = homeCards[2];

  return (
    <Carousel className="w-full max-w-md mt-20">
      <CarouselContent>
        <CarouselItem>
        <Link to={cardProfile.page}>
              <li className="relative w-64 sm:w-112 h-128 border-2 rounded-xl hover:cursor-pointer">
                <ul>
                  <li className="absolute inset-0 flex flex-col justify-between items-center leading-8 text-white z-10 p-12 text-xl">
                    <p className="text-2xl">PROFILE</p>
                    <p>{cardProfile.description}</p>
                  </li>
                </ul>
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={cardProfile.image}
                  alt={cardProfile.alt}
                />
                <div className="absolute inset-0 rounded-xl bg-black opacity-80"></div>
              </li>
            </Link>
        </CarouselItem>
        <CarouselItem>
        <Link to={cardExercise.page}>
              <li className="relative w-64 sm:w-112 h-128 border-2 rounded-xl hover:cursor-pointer">
                <ul>
                  <li className="absolute inset-0 flex flex-col justify-between items-center leading-8 text-white z-10 p-12 text-xl">
                  <p className="text-2xl">EXERCISE</p>
                    <p>{cardExercise.description}</p>
                  </li>
                </ul>
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={cardExercise.image}
                  alt={cardExercise.alt}
                />
                <div className="absolute inset-0 rounded-xl bg-black opacity-80"></div>
              </li>
            </Link>
        </CarouselItem>
        <CarouselItem>
        <Link to={cardWorkout.page}>
              <li className="relative w-64 sm:w-112 h-128 border-2 rounded-xl hover:cursor-pointer">
                <ul>
                  <li className="absolute inset-0 flex flex-col justify-between items-center leading-8 text-white z-10 p-12 text-xl">
                    <p className="text-2xl">WORKOUT</p>
                    <p>{cardWorkout.description}</p>
                  </li>
                </ul>
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={cardWorkout.image}
                  alt={cardWorkout.alt}
                />
                <div className="absolute inset-0 rounded-xl bg-black opacity-80"></div>
              </li>
            </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
