import { Link } from "react-router-dom";

export default function Exercises() {
  const loggedUser = sessionStorage.getItem("auth_token");

  if (!loggedUser) {
    return window.location.href = "/login";
  }


  return (
    <section className="w-full">
      <header className="flex flex-col gap-4 items-center mt-5">
        <h1 className="head-text">Exercises</h1>
        <h2 className="subtitle">Choose a category:</h2>
      </header>
      <ul className="flex flex-col gap-16 justify-center md:flex-row items-center mt-16 mb-20">
        <li className="relative w-80 h-128 border-2 rounded-xl hover:cursor-pointer scale-on-hover transition-transform duration-2000">
          <Link data-test="ex-cf" to="crossfit">
          <p className="absolute inset-0 flex justify-center text-white z-10 p-4 text-2xl">
            CROSSFIT
          </p>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src="src/images/crossfit-ex.jpg"
            alt="crossfit-main"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-40"></div>
          </Link>
        </li>
        <li className="relative w-80 h-128 border-2 rounded-xl hover:cursor-pointer scale-on-hover transition-transform duration-2000">
          <Link data-test="ex-bb" to="bodybuilding">
          <p className="absolute inset-0 flex justify-center text-white z-10 p-4 text-2xl">
            BODYBUILDING
          </p>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src="src/images/bodybuilding-ex.jpg"
            alt="bodybuilding-ex"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
          </Link>
        </li>
      </ul>
    </section>
  );
}
