import Link from "next/link";

export const metadata = {
  title:
    "Online Coding Classes for Dubai Students | Prompt Computer Classes",
  description:
    "Join live online coding classes for Dubai students. Learn Python, Java, C, SQL, web development, and build real projects with Prompt Computer Classes.",
  keywords: [
    "online coding classes Dubai",
    "coding classes for Dubai students",
    "Python classes Dubai students",
    "Java classes Dubai students",
    "computer classes Dubai",
    "student coding projects Dubai",
    "online programming classes UAE",
    "coding classes UAE students",
    "web development classes Dubai",
    "online computer classes Dubai",
  ],
};

const courses = [
  {
    title: "Python Programming",
    description:
      "Learn Python from basics to practical projects with clear explanations, logic building, and hands-on coding practice.",
    icon: "🐍",
  },
  {
    title: "Java Programming",
    description:
      "Build strong programming fundamentals, object-oriented concepts, and exam-level Java problem-solving skills.",
    icon: "☕",
  },
  {
    title: "C Programming",
    description:
      "Understand core programming logic, loops, functions, arrays, and problem-solving using C language.",
    icon: "💻",
  },
  {
    title: "SQL & Database Basics",
    description:
      "Learn database concepts, SQL queries, tables, records, and practical database handling for projects.",
    icon: "🗄️",
  },
  {
    title: "Web Development",
    description:
      "Start building websites using HTML, CSS, JavaScript, React, and modern frontend development concepts.",
    icon: "🌐",
  },
  {
    title: "Project-Based Learning",
    description:
      "Students learn by building real projects that can be shown to parents, guardians, and future opportunities.",
    icon: "🚀",
  },
];

const whoCanJoin = [
  "School students from Class 6 to Class 10",
  "Class 11 and Class 12 students learning Python, Java, or Computer Science",
  "BCA, MCA, B.Tech, and college learners",
  "Beginners who want to start coding from zero",
  "Students in Dubai and UAE looking for live online coding classes",
  "Parents who want practical coding exposure for their children",
];

const benefits = [
  {
    title: "Live Online Classes",
    description:
      "Students can learn from anywhere in Dubai or UAE through live interactive online classes.",
  },
  {
    title: "Practical Learning",
    description:
      "The focus is not only on theory but also on coding practice, assignments, and real project work.",
  },
  {
    title: "Board-Focused Support",
    description:
      "Helpful for CBSE, ICSE, and school students who need programming support for academics.",
  },
  {
    title: "Project Showcase",
    description:
      "Students can showcase their projects publicly through a dedicated student project showcase platform.",
  },
  {
    title: "Doubt Support",
    description:
      "Students get support for doubts, coding errors, practical files, viva preparation, and project guidance.",
  },
  {
    title: "Beginner Friendly",
    description:
      "Classes are designed in a simple and step-by-step way so beginners can understand programming confidently.",
  },
];

export default function OnlineCodingClassesDubaiPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-blue-900 px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-16 h-40 w-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-16 h-52 w-52 rounded-full bg-blue-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-purple-100 backdrop-blur">
              🌍 Live Online Coding Classes for Dubai & UAE Students
            </p>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Online Coding Classes for Dubai Students
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100 md:text-xl">
              Learn Python, Java, C, SQL, and Web Development through
              live online classes with practical guidance, project-based
              learning, and student portfolio support by Prompt Computer
              Classes.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/showcase/projects"
                className="rounded-xl bg-white px-7 py-4 font-semibold text-purple-800 transition hover:bg-purple-100"
              >
                View Student Projects
              </Link>

              <Link
                href="/showcase/users"
                className="rounded-xl border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Student Profiles
              </Link>

              <a
                href="https://wa.me/919997919967"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-500 px-7 py-4 font-semibold text-white transition hover:bg-green-600"
              >
                📱 Contact on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-purple-100">
              📱 Phone/WhatsApp:{" "}
              <a
                href="tel:+919997919967"
                className="underline underline-offset-4 transition hover:text-white"
              >
                +91-999 791 9967
              </a>
            </p>

            <div className="mt-10 grid gap-4 text-sm text-purple-100 md:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                ✅ Live Online Classes
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                ✅ Practical Project Support
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                ✅ Beginner-Friendly Teaching
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Why this page?
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Coding Education for Students in Dubai, UAE
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Many students in Dubai and UAE want to learn programming,
            but they need a simple, practical, and guided learning
            environment. Prompt Computer Classes provides live online
            coding classes where students can learn programming concepts,
            complete practical files, prepare for school and college
            requirements, and build real projects.
          </p>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            This platform also helps parents and guardians see the actual
            work built by students through a public student project
            showcase.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Courses Offered
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Learn Programming with Practical Projects
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Students can start from the basics and gradually move
              toward real-world coding projects, portfolio building, and
              practical implementation.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.title}
                className="rounded-3xl border bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 text-4xl">
                  {course.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
              Who can join?
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Designed for School, College, and Beginner Learners
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Whether a student is starting from zero or already learning
              programming in school or college, these online coding classes
              are structured to build confidence step by step.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <ul className="space-y-4">
              {whoCanJoin.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-gray-700"
                >
                  <span className="text-green-600">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-purple-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-200">
              Why Choose Prompt Computer Classes?
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Practical Coding Guidance for Dubai Students
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-purple-100">
              The goal is to help students understand coding deeply,
              practice consistently, and build projects that prove their
              learning.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-white/10 p-7 backdrop-blur transition hover:bg-white/15"
              >
                <h3 className="text-xl font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-purple-100">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Want to Join Online Coding Classes?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Students and parents from Dubai or UAE can contact Prompt
            Computer Classes for online coding classes, project guidance,
            programming support, and student portfolio learning.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919997919967"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-500 px-7 py-4 font-semibold text-white transition hover:bg-green-600"
            >
              📱 Chat on WhatsApp
            </a>

            <a
              href="tel:+919997919967"
              className="rounded-xl border border-purple-200 px-7 py-4 font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              Call: +91-999 791 9967
            </a>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-white to-purple-50 p-8 shadow-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                Student Project Showcase
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                Parents and Guardians Can View Real Student Work
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                The student showcase allows visitors, parents, and
                guardians to explore student profiles, project details,
                skills, GitHub links, live demo links, and creative work
                in one place.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                This makes learning visible and helps students build
                confidence by presenting their practical work publicly.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/showcase/projects"
                  className="rounded-xl bg-purple-600 px-7 py-4 font-semibold text-white transition hover:bg-purple-700"
                >
                  Explore Projects
                </Link>

                <Link
                  href="/showcase/users"
                  className="rounded-xl border border-purple-200 px-7 py-4 font-semibold text-purple-700 transition hover:bg-purple-50"
                >
                  View Students
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-purple-50 p-5">
                  <p className="text-sm text-gray-500">
                    Showcase Includes
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    Student Profiles
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-500">
                    Practical Work
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    Coding Projects
                  </h3>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm text-gray-500">
                    Portfolio Proof
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    GitHub + Live Demo Links
                  </h3>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-5">
                  <p className="text-sm text-gray-500">
                    Visibility
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    SEO-Friendly Public Pages
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Text Section */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Online Programming Classes for Dubai and UAE Students
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Prompt Computer Classes offers online coding classes for
            students who want to learn Python, Java, C, SQL, web
            development, and programming fundamentals from anywhere. This
            page is specially created for Dubai-based students, UAE
            learners, and parents looking for practical computer classes
            with live teaching and project support.
          </p>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Students can learn coding concepts, complete practical
            assignments, work on mini projects, and build a portfolio that
            can be shown through the student project showcase platform.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Common Questions
          </h2>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold">
              Are these classes available for students in Dubai?
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Yes. Students based in Dubai or UAE can join through live
              online classes.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold">
              Which programming languages can students learn?
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Students can learn Python, Java, C, SQL, web development,
              and project-based programming concepts.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold">
              Is this suitable for beginners?
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Yes. The classes are beginner-friendly and designed to
              explain programming concepts step by step.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold">
              Can parents view student projects?
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Yes. Parents, guardians, and visitors can explore student
              profiles and projects through the public showcase pages.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold">
              How can students or parents contact Prompt Computer Classes?
            </h3>
            <p className="mt-2 leading-7 text-gray-600">
              Students and parents can contact through Phone/WhatsApp at{" "}
              <a
                href="tel:+919997919967"
                className="font-semibold text-purple-600 underline underline-offset-4"
              >
                +91-999 791 9967
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-purple-700 to-blue-700 p-10 text-center text-white shadow-2xl md:p-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to Start Coding from Dubai?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-purple-100">
            Explore real student projects and see how practical learning
            helps students build confidence in coding.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/showcase/projects"
              className="rounded-xl bg-white px-7 py-4 font-semibold text-purple-700 transition hover:bg-purple-100"
            >
              View Projects
            </Link>

            <Link
              href="/showcase/users"
              className="rounded-xl border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              View Students
            </Link>

            <a
              href="https://wa.me/919997919967"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-500 px-7 py-4 font-semibold text-white transition hover:bg-green-600"
            >
              Contact on WhatsApp
            </a>
          </div>

          <p className="mt-6 text-base font-semibold text-purple-100">
            📱 Phone/WhatsApp:{" "}
            <a
              href="tel:+919997919967"
              className="underline underline-offset-4 transition hover:text-white"
            >
              +91-999 791 9967
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}