interface homeCardsProps {
  name: string;
  description: string;
  image: string;
  alt: string;
  page: string;
}

export const homeCards: homeCardsProps[] = [
  {
    name: "Profile",
    description:
      "Write your information and discover your Body Mass Index and your Body Metabolic Rate",
    image: "src/images/profile-home.jpg",
    alt: "exercises-home",
    page: "profile"
  },
  {
    name: "Exercises",
    description:
      "Add exercises to your list and set your 1 rep max for each one",
    image: "src/images/exercise-home.jpg",
    alt: "profile-home",
    page: "exercises"
  },
  {
    name: "Workout",
    description:
      "Do your own crossfit or bodybuilding workouts according to the exercises available",
    image: "src/images/workout-home.jpg",
    alt: "workout-home",
    page:"workouts"
  },
];
