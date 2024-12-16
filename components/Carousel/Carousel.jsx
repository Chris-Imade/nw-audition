"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const IMAGES = [
  {
    id: 0,
    imageSrc: "/assets/img1.webp",
    stage_name: "Genevieve Nnaji",
    excerpt:
      "Genevieve Nnaji is one of Nollywood's most celebrated actresses, known for her powerful performances and timeless beauty. She has won numerous awards for her roles and continues to inspire millions in Nigeria and beyond.",
  },
  {
    id: 1,
    imageSrc: "/assets/img2.jpg",
    stage_name: "Ramsey Nouah",
    excerpt:
      "Ramsey Nouah is a legendary Nollywood actor, acclaimed for his versatility and charm. With decades of stellar performances, he remains a household name in the Nigerian movie industry.",
  },
  {
    id: 2,
    imageSrc: "/assets/img3.webp",
    stage_name: "Omotola Jalade-Ekeinde",
    excerpt:
      "Omotola Jalade-Ekeinde, fondly known as 'Omosexy,' is a Nollywood icon who has graced the screen in numerous blockbuster movies. She is a philanthropist, actress, and advocate for social change.",
  },
  {
    id: 3,
    imageSrc: "/assets/img4.jpg",
    stage_name: "Richard Mofe-Damijo (RMD)",
    excerpt:
      "Richard Mofe-Damijo, popularly known as RMD, is an award-winning actor and former commissioner for culture and tourism in Delta State. His grace and talent make him a Nollywood legend.",
  },
  {
    id: 4,
    imageSrc: "/assets/img5.webp",
    stage_name: "Funke Akindele",
    excerpt:
      "Funke Akindele is an actress, producer, and director renowned for her comedic brilliance in the 'Jenifa' series. She is a force in Nollywood, inspiring a generation of creative minds.",
  },
];

const quotes = [
  {
    quote: "Being a great actor is a journey of discovery",
    excerpt:
      "A compelling reflection on the transformative journey and self-exploration inherent in acting.",
  },
  {
    quote:
      "Acting is not about being someone different. It's finding the similarity in what is apparently different.",
    excerpt:
      "This quote underscores the profound empathy and connection actors cultivate with their characters.",
  },
  {
    quote: "The best way to predict the future is to create it.",
    excerpt:
      "An empowering reminder that actors hold the creative agency to shape their own professional trajectories.",
  },
  {
    quote: "Every actor is a storyteller.",
    excerpt:
      "A concise acknowledgment of the actor's role as a vessel for narrative and meaning.",
  },
  {
    quote: "Acting is the ability to dream on cue.",
    excerpt:
      "An eloquent testament to the imaginative and spontaneous essence of the acting craft.",
  },
];

// Variants for animating text elements
const textVariants = {
  hidden: { opacity: 0, y: 20 }, // Hidden state: opacity is 0 and moves down slightly
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom, // Delay based on the custom parameter
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

// Variants for animating the modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 }, // Hidden state: reduced opacity and scale
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of the carousel
  const [showModal, setShowModal] = useState(false); // Tracks whether the modal is displayed
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    stateOfOrigin: "",
    age: "",
    mobileNumber: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Handle success message
        setShowModal(false); // Close modal after submission
        setShowSuccessModal(true); // Show success modal
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="h-screen w-screen relative">
      {/* Swiper carousel setup */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2000, // Automatic slide change every 2 seconds
          disableOnInteraction: false, // Keeps autoplay active after interaction
        }}
        pagination={{ clickable: true }} // Adds clickable pagination controls
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)} // Updates the current index
        className="h-full w-full"
      >
        {IMAGES.map((image) => (
          <SwiperSlide key={image.id} className="relative h-full w-full">
            {/* Display each image in the carousel */}
            <Image
              src={image.imageSrc}
              alt={image.stage_name}
              fill
              className="absolute inset-0 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div className="absolute inset-0 flex flex-col justify-between items-center z-10 bg-black/70">
        {/* Animated text content */}
        <motion.div
          className="absolute top-24 w-full text-center"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-semibold text-white/90"
            custom={0.5}
            variants={textVariants}
          >
            Join the Actors Guild of Nigeria
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-white/70 mt-2"
            custom={0.7}
            variants={textVariants}
          >
            The journey of a thousand miles begins with a single step
          </motion.p>
        </motion.div>

        {/* New Content: Nollywood Auditions */}
        <motion.div
          className="text-center text-white bg-purple-800/50 p-6 md:p-10 rounded-lg shadow-lg w-11/12 max-w-lg md:w-[500px] mt-48"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={1.0}
        >
          <h2 className="text-lg md:text-xl font-bold">
            🎬 Do You Have What It Takes to Be Nollywood's Next Star? 🎭
          </h2>
          <p className="text-sm md:text-base mt-3">
            Join the 2025/2026 Nollywood Auditions and showcase your talent to
            top producers!
          </p>
          <ul className="text-sm md:text-base list-disc list-inside mt-3">
            <li>���� Limited Slots</li>
            <li>🌟 Training with Industry Experts</li>
            <li>💰 Register Now to Start Your Journey!</li>
          </ul>
        </motion.div>

        {/* Quote section with a button to open the modal */}
        <motion.div className="mt-auto p-4 bg-white rounded-lg shadow-lg w-11/12 max-w-lg md:w-[500px] mb-[1rem]">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            "{quotes[currentIndex % quotes.length].quote}"
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            - {quotes[currentIndex % quotes.length].excerpt}
          </p>
          <motion.button
            className="mt-6 bg-green-500 hover:bg-green-700 text-white py-2 px-6 md:px-8 rounded-md text-sm md:text-base"
            custom={1.0}
            variants={textVariants}
            onClick={() => setShowModal(true)} // Opens the modal when clicked
          >
            Register Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal for registration form */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white w-full max-w-2xl h-full md:h-auto rounded-lg p-6 md:p-8 overflow-y-scroll">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Register Now
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="text"
                  name="stateOfOrigin"
                  placeholder="State of Origin"
                  value={formData.stateOfOrigin}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </form>
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="ml-4 bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-md flex items-center"
                  onClick={handleSubmit}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white w-full max-w-md rounded-lg p-6 md:max-w-md mx-4 md:mx-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Submission Successful 🎉🎊🚀
              </h2>
              <p className="text-gray-600 mb-4">
                Your registration details have been submitted successfully.
                We'll get back to you shortly
              </p>
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-md w-full"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "https://insidenollywood.ng/talent-management";
                }}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
