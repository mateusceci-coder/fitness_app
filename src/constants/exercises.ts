interface exercisesProps {
    exercise: string
    equipment:string
    weight: number
    relation: number
}

export const exercisesList: exercisesProps[] =
    [
        {
            exercise: "Bench Press",
            equipment: "Bar",
            weight: 132,
            relation: 1.28
        },
        {
            exercise: "Shoulder Press",
            equipment: "Bar",
            weight: 65,
            relation: 0.78
        },
        {
            exercise: "Overhead Squat",
            equipment: "Dumbbell",
            weight: 34,
            relation: 0.51
        }
    ]
