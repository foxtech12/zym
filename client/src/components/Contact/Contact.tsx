import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from '../../assets/images/Banner/banner.jpg';
import InstagramIcon from '../../assets/images/Unleash/instagram.svg';
import TikTokIcon from '../../assets/images/Unleash/tiktok.svg';
import YouTubeIcon from '../../assets/images/Unleash/youtube.svg';

function Contact() {
  const [form, setForm] = useState(true);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    selectedClass: '',
    message: '',
  });

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/add`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        },
      );

      if (response.ok) {
        setForm(false);
        toast.success('We will get back to you soon....');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <section>
      <ToastContainer />
      <div>
        <img
          className="w-full object-fill pt-20 lg:h-max lg:-translate-y-12"
          src={Banner}
          alt="banner"
        />
        <h1 className="-translate-y-10 text-center text-3xl font-bold tracking-widest text-white lg:-translate-y-28 lg:text-5xl">
          Contact
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center px-8 lg:flex-row lg:px-24">
        <main className="flex flex-col space-y-8 lg:w-1/2 lg:px-16">
          <h1 className="pb-4 text-center text-3xl font-bold tracking-widest lg:text-justify">
            Our mission is your desired physique!
          </h1>
          <p className="text-justify">
            Fit4Life is committed to supporting you in realizing your ideal
            body. Our team of skilled trainers and nutritionists will
            collaborate with you to develop a customized workout and meal
            program tailored to your individual objectives.
          </p>
          <div className="grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-2">
            <div className="w-full">
              <h2 className="border-b-2 border-[#0f766e] text-lg font-semibold">
                Full Address
              </h2>
              <p className="pt-2">123 Main Street, Anytown</p>
              <p>New York City, USA</p>
            </div>
            <div className="w-full">
              <h2 className="border-b-2 border-[#0f766e] text-lg font-semibold">
                Opening Hours
              </h2>
              <p className="pt-2">Mon - Fri: 06:00am - 20:00pm</p>
              <p>Sat - Sat: 07:00am - 20:00pm</p>
            </div>
            <div className="w-full">
              <h2 className="border-b-2 border-[#0f766e] text-lg font-semibold">
                Information
              </h2>
              <p className="pt-2">+123-456-789</p>
              <p>fit4life@fit4life.com</p>
            </div>
            <div className="w-full">
              <h2 className="border-b-2 border-[#0f766e] text-lg font-semibold">
                Follow Our Socials
              </h2>
              <p className="flex gap-3 pt-2 pb-8">
                <img className="h-8" src={InstagramIcon} alt="Instagram" />
                <img className="h-8" src={TikTokIcon} alt="TikTok" />
                <img className="h-8" src={YouTubeIcon} alt="YouTube" />
              </p>
            </div>
          </div>
        </main>
        {form ? (
          <form
            onSubmit={handleSubmit}
            className="order-first flex w-full flex-col items-start justify-start gap-5 rounded-md bg-zinc-500/10 py-8 px-8 lg:order-last lg:w-2/5"
          >
            <h1 className="border-b-2 border-[#0f766e] text-2xl font-semibold">
              Reach Us Out!
            </h1>
            <input
              className="w-full rounded-md p-2"
              type="text"
              name="name"
              placeholder="Full Name*"
              value={contactData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-md p-2"
              type="email"
              name="email"
              placeholder="E-mail Address*"
              value={contactData.email}
              onChange={handleChange}
              required
            />
            <select
              className="w-full rounded-md p-1"
              name="selectedClass"
              value={contactData.selectedClass}
              onChange={handleChange}
              required
            >
              <option value="">Select Class</option>
              <option>Body Building</option>
              <option>Martial Arts</option>
              <option>Running</option>
              <option>Fitness</option>
              <option>Yoga</option>
              <option>Functional Training</option>
              <option>Calisthenics</option>
              <option>Meditation</option>
              <option>Cycling</option>
            </select>
            <textarea
              className="h-32 w-full rounded-md p-2"
              name="message"
              placeholder="Message"
              value={contactData.message}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mx-auto rounded-lg bg-[#0f766e] px-4 py-2 text-white hover:bg-[#0f766e]/80"
            >
              Submit Now
            </button>
          </form>
        ) : (
          <div className="order-first flex h-[477px] w-full flex-col items-start justify-start gap-5 rounded-md bg-zinc-500/10 py-8 px-8 lg:order-last lg:w-2/5">
            <h1 className="border-b-2 border-[#0f766e] text-2xl font-semibold">
              Thank you!
            </h1>
            <p className="text-lg font-semibold">
              One member of our team will get in contact!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
