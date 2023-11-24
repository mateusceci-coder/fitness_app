export function bmiCalculator(height: number, weight: number) {
    const bmi = weight/((height/10)*(height/10))

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
    if (sex === "men") {
        result = 88.362 + (13.397 * weight) + (4.799*height) - (5.677 * age)
    } else {
        result = 447.593 + (9.247 * weight) + (3.098*height) - (4.330 * age)
    }

    return Math.floor(result)
}