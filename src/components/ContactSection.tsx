import FadeIn from "@/animations/FadeIn";

const ContactSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <FadeIn delay={0.3}>
        <div className="space-y-2 text-center mb-10">
          <p className="text-base font-light">Get In Touch</p>
          <h1 className="font-bold text-dark text-2xl text-orange-400">
            Contact Me
          </h1>
        </div>
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28">
          {/* Kolom pertama - Deskripsi */}
          <div className="space-y-4">
            <h2 className="text-4xl font-light max-w-[290px]">
              Hit me up for collaboration👋
            </h2>
            <p className="font-light w-3/4">
              If you have any questions, projects, or just want to say hello,
              don’t hesitate to contact me.
            </p>
          </div>

          {/* Kolom kedua - Form Kontak */}
          <div>
            <form className="space-y-5" method="POST" autoComplete="off">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-3"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="bg-zinc-300/50 dark:bg-zinc-800 p-3 block w-full rounded-md shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="bg-zinc-300/50 dark:bg-zinc-800 p-3 block w-full rounded-md shadow-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="bg-zinc-300/50 dark:bg-zinc-800 p-3 block w-full rounded-md shadow-sm"
                  placeholder="Write your message here"
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-orange-400 text-base font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ContactSection;
