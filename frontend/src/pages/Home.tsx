import CarouselHome from "@/components/CarouselHome";

export default function Home() {

  return (
    <section className="w-full max-w-5xl mx-auto mb-20">
      <h1 className="my-12 text-center text-5xl text-mainBlue font-playfair">
        My Fitness App
      </h1>
      <h2 className="subtitle">
        Your information about crossfit and bodybuilding all in one place
      </h2>
        <CarouselHome />
    </section>
  );
}
