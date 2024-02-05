import CarouselHome from "@/components/CarouselHome";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center max-w-5xl mx-auto mb-20">
      <h1 className="mb-4 mt-2 text-center text-5xl text-mainBlue font-playfair">
        My Fitness App
      </h1>
      <h2 className="subtitle">
        Your information about crossfit and bodybuilding all in one place
      </h2>
      <div className="my-4">
        <Button>Sign In</Button> or <Button>Log In</Button>
      </div>
      <article className="flex gap-2">
        <img
          src="src/images/profile-card.jpg"
          alt="Profile Image"
          className="w-152"
        />
        <div>
          <h2 className="subtitle text-start mb-2">Profile Creation</h2>
          <p className="leading-7">
            By creating a profile, you will gain access to your:
            <p>
              <span className="highlighted-text">
                -Basal Metabolic Rate (BMR),
              </span>{" "}
              which is an estimate of how many calories your body needs to
              maintain basic physiological functions at rest, like breathing and
              circulation.
              <p>
                <span className="highlighted-text">- Body Mass Index (BMI),</span>{" "}
                a measure that uses your height and weight to estimate body fat
                and assess your overall health status.
              </p>
            </p>
          </p>
        </div>
      </article>
      <CarouselHome />
    </section>
  );
}
