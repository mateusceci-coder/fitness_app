export function bmiCalculator(height: number, weight: number) {

    const heightM = height /100

    const bmi = weight/(heightM * heightM)

    let result;
    if (bmi < 18.5) {
        result = "You are Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        result = "You have normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        result = "You are overweight";
    } else {
        result = "You are obese";
    }

    return { bmi: bmi.toFixed(2), result: result };
}

export function caloriesCalculator(height: number, weight:number, age:number, sex:string) {
    let result
    if (sex === "male") {
        result = 88.362 + (13.397 * weight) + (4.799*height) - (5.677 * age)
    } else {
        result = 447.593 + (9.247 * weight) + (3.098*height) - (4.330 * age)
    }

    return Math.floor(result)
}

export function calculateWeightReps(repMax: number, numReps: number) {
    if (repMax === 0) {
        return 0
    }

    const table: {[key: number]: number } = {
        1: 1.00, 2: 0.97, 3: 0.94, 4: 0.92, 5: 0.89,
        6: 0.86, 7: 0.83, 8: 0.81, 9: 0.78, 10: 0.75,
        11: 0.73, 12: 0.71, 13: 0.70, 14: 0.68, 15: 0.67,
        16: 0.65, 17: 0.64, 18: 0.63, 19: 0.61, 20: 0.60
    };

    return repMax * table[numReps];
}

export function calculateAge(dateOfBirth: string): number {


    const today = new Date();
    const dobDate = new Date(dateOfBirth);

    // Calcula a diferença em milissegundos
    const ageDiffMilliseconds = today.getTime() - dobDate.getTime();

    // Converte a diferença em anos
    const ageDate = new Date(ageDiffMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    return calculatedAge;
  }