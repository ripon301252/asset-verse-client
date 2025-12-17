// import React from "react";
// import HeroImg from "../assets/banner.jpg";

// const Hero = () => {
//   return (
//     <section className="bg-white dark:bg-gray-700 py-16">
//       <div className="max-w-7xl mx-auto px-5 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">

//         {/* Left Text */}
//         <div className="flex-1 text-center lg:text-left">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
//             AssetVerse
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg sm:text-xl">
//             Connect, track, and grow your assets effortlessly.
//           </p>

//           {/* Call to Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//             <a
//               href="/joinEmployee"
//               className="px-6 py-3 bg-[#5b46b1] hover:bg-[#654dc7] text-white rounded-md transition-all duration-300 text-center"
//             >
//               Join as Employee
//             </a>
//             <a
//               href="/joinHr"
//               className="px-6 py-3 border border-[#5b46b1] hover:bg-[#5b46b1]   rounded-md transition-all duration-300 text-center"
//             >
//               Join as HR
//             </a>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex-1 flex justify-center lg:justify-end">
//           <img src={HeroImg} alt="Hero Illustration" className="w-full max-w-md" />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-32 px-6 md:px-12 lg:px-24 text-center overflow-hidden">
    {/* Background Shape */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-purple-800 rounded-full opacity-30 blur-3xl -z-10"></div>

    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
    >
      Smart Corporate <br /> Asset Management
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-gray-200 text-lg sm:text-xl max-w-3xl mx-auto mb-8"
    >
      Manage company assets, employees, and growth from one secure, intuitive platform designed for modern businesses.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="flex justify-center gap-4 flex-wrap"
    >
      <a
        href="#packages"
        className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Get Started
      </a>
      <a
        href="#about"
        className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-purple-700 transition"
      >
        Learn More
      </a>
    </motion.div>
  </section>
);

export default Hero;
