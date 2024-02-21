import { Button } from "@/components/ui/button";
import Footer from "@/layouts/Footer";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center max-w-5xl mx-auto">
        <h1 className="mb-4 mt-2 text-center text-6xl text-mainBlue font-playfair">
          My Fitness App
        </h1>
        <h2 className="subtitle">
          Your information about crossfit and bodybuilding all in one place
        </h2>
        <div className="my-6">
          <Button>Create or Account</Button> or <Button>Log In</Button>
        </div>
        <div className="flex flex-col">
          <article className="grid md:grid-cols-2 gap-2 article mb-12 md:mb-2">
            <img
              src="src/images/profile-card.jpg"
              alt="Profile Image"
              className="w-112 md:w-152 mx-auto"
            />
            <div>
              <h2 className="text-3xl text-mainBlue text-center md:text-start mb-12 md:mb-2">
                Profile
              </h2>
              <p className="leading-7 md:text-start text-center">
                By creating a profile, you will gain access to your:
                <p>
                  <span className="highlighted-text">
                    -Basal Metabolic Rate (BMR),
                  </span>{" "}
                  which is an estimate of how many calories your body needs to
                  maintain basic physiological functions at rest, like breathing
                  and circulation.
                  <p>
                    <span className="highlighted-text">
                      - Body Mass Index (BMI),
                    </span>{" "}
                    a measure that uses your height and weight to estimate body
                    fat and assess your overall health status.
                  </p>
                </p>
              </p>
            </div>
          </article>
          <article className="grid md:grid-cols-2 gap-2 article mb-12 md:mb-2">
            <div>
              <h2 className="text-3xl text-mainBlue text-center md:text-start mb-2">
                Exercises
              </h2>
              <p className="leading-7 md:text-start text-center">
                In the exercises tab, you can add an exercise and enter your{" "}
                <span className="highlighted-text">1 rep max (1RM),</span> as
                well as choose the equipment (bar, dumbbell or kettlebell) that
                was used. You also have the option to update the weight of the
                exercises or delete them. The exercises are divided into the
                categories of CrossFit and weightlifting.
              </p>
            </div>
            <img
              src="src/images/exercises-card.jpg"
              alt="Exercises Card"
              className="w-112 md:w-152 mx-auto"
            />
          </article>
          <article className="grid md:grid-cols-2 gap-2 mb-2 md:order-2 article">
            <div className="md:order-2">
              <h2 className="text-3xl text-mainBlue text-center md:text-start mb-2">
                Workouts
              </h2>
              <p className="leading-7 md:text-start text-center">
                In the workouts tab, you can{" "}
                <span className="highlighted-text">
                  create your own workouts
                </span>{" "}
                using movements from the exercises tab or also create a new
                exercise. The CrossFit section is customized for each type of
                WOD, and in the weightlifting section, you will have a suggested
                load based on your weight and the number of repetitions.
              </p>
            </div>
            <img
              src="src/images/workouts-card.jpg"
              alt="Workouts Card"
              className="md:order-1 w-112 md:w-152 mx-auto"
            />
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
