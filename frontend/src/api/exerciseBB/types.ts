

export interface exerciseParams {
    name: string,
    equipment: string;
    rep_max: number;
}

export interface getExerciseList {
    rep_max: number,
    id: number
    name: string,
    equipment: string,
}