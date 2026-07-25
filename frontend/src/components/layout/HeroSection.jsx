const HeroSection = ({ children }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-950">
      {/* Animated orbs */}
      <div className="orb w-72 h-72 bg-white/20 top-[-50px] left-[-50px] animate-float" />
      <div className="orb w-96 h-96 bg-purple-300/20 bottom-[-100px] right-[-80px] animate-float-delayed" />
      <div className="orb w-48 h-48 bg-pink-300/20 top-[40%] left-[60%] animate-float" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Analyze Any Website
          <br />
          <span className="text-white/80">in Seconds</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Enter a URL and get a comprehensive SEO report with actionable insights.
          Fast, free, and beautifully presented.
        </p>
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
