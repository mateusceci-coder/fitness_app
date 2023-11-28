export default function Workouts() {
  return (
    <div className="w-full">
      <header className="flex flex-col gap-4 items-center mt-5">
        <h1 className="head-text">Workouts</h1>
        <h2 className="subtitle">Choose a category:</h2>
      </header>
      <ul className="flex flex-col gap-16 justify-center md:flex-row items-center mt-16 mb-20">
        <li className="relative w-80 h-128 border-2 rounded-xl hover:cursor-pointer scale-on-hover transition-transform duration-2000">
          <p className="absolute inset-0 flex justify-center text-white z-10 p-4 text-2xl">
            CROSSFIT
          </p>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src="src/images/crossfit-main.jpg"
            alt="crossfit-main"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-20"></div>
        </li>
        <li className="relative w-80 h-128 border-2 rounded-xl hover:cursor-pointer scale-on-hover transition-transform duration-2000">
          <p className="absolute inset-0 flex justify-center text-white z-10 p-4 text-2xl">
            BODYBUILDING
          </p>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src="src/images/bodybuilding-main.jpg"
            alt="bodybuilding-main"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
        </li>
      </ul>
    </div>
  );
}
