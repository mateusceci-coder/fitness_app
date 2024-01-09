export interface exercisesProps {
  id: string;
  exercise: string;
  equipment: string;
  weight: number;
  relation?: number;
}

export const exercisesBodybuildingList: exercisesProps[] = [
  {
    id: "1",
    exercise: "Bench Press",
    equipment: "Bar",
    weight: 132,
    relation: 1.28,
  },
  {
    id: "2",
    exercise: "Shoulder Press",
    equipment: "Bar",
    weight: 65,
    relation: 0.78,
  },
  {
    id: "3",
    exercise: "Overhead Squat",
    equipment: "Dumbbell",
    weight: 34,
    relation: 0.51,
  },
];

export const exercisesCrossfitList: exercisesProps[] = [
    {
      id: "4",
      exercise: "Squat Clean",
      equipment: "Bar",
      weight: 132,
      relation: 1.28,
    },
    {
      id: "5",
      exercise: "Push Press",
      equipment: "Bar",
      weight: 65,
      relation: 0.78,
    },
    {
      id: "6",
      exercise: "Pistol",
      equipment: "Dumbbell",
      weight: 12,
      relation: 0.11,
    },
  ];