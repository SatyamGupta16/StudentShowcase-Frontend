import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-between px-6 py-10 lg:px-12">

        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
            🚀 Showcase Your Talent
          </span>

          <h1 className="mt-6 text-6xl font-bold leading-tight">
            Turn Your
            <br />
            <span className="text-purple-600">
              Student Projects
            </span>
            <br />
            Into A Portfolio
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Discover amazing student projects, connect with talented
            developers, and explore innovative ideas from students
            across different domains.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="rounded-xl bg-purple-600 px-8 py-4 font-medium text-white transition hover:bg-purple-700">
              Explore Projects
            </button>

            <button className="rounded-xl border border-gray-300 px-8 py-4 font-medium transition hover:bg-gray-100">
              Add Project
            </button>
          </div>
        </div>



        {/* Right Side */}
        <div className="relative flex items-center justify-center">

          <div className="h-[450px] w-[350px] rounded-3xl bg-gradient-to-br from-purple-200 to-purple-500 shadow-2xl"></div>

          <div className="absolute -left-10 top-10 rounded-2xl bg-white p-4 shadow-xl">
            <h4 className="font-semibold">Student</h4>
            <p className="text-sm text-gray-500">B.Tech CSE</p>
          </div>

          <div className="absolute -right-8 bottom-16 rounded-2xl bg-white p-4 shadow-xl">
            <h4 className="font-semibold">12 Projects</h4>
            <p className="text-sm text-gray-500">Completed</p>
          </div>

        </div>

      </section>

      <section className="mx-auto max-w-6xl py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600">500+</h2>
            <p>Projects</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600">200+</h2>
            <p>Students</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600">50+</h2>
            <p>Technologies</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600">20+</h2>
            <p>Categories</p>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold">
            Featured Projects
          </h2>

          <button className="text-purple-600">
            View All →
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-3xl bg-white p-5 shadow-lg transition hover:-translate-y-2">
            <div className="mb-4 h-40 rounded-2xl bg-purple-100"></div>

            <h3 className="font-bold">
              AI Healthcare Predictor
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Next.js • FastAPI • ML
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}