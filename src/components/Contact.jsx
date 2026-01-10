import React, { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import useAxios from "../Hooks/useAxios";

const Contact = () => {
  const axios = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // 1️⃣ Send to backend
      const res = await axios.post("/contact", formData);
      console.log("Backend response:", res.data);

      // 2️⃣ EmailJS send
      await emailjs.send(
        "service_ismpp5l",
        "template_d6w3243",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "5VmMzxI_WOZfotIti"
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-800 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Have questions? Feel free to reach out to us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
