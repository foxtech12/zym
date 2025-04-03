import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from '../assets/images/Banner/banner.jpg';
import Footer from '@/components/Footer/Footer';

interface FormData {
  email: string;
  password: string;
}

const User: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data: { token?: string; message?: string } = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); // Save token in localStorage
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 2000,
        });

        // Ensure redirection works properly
        setTimeout(() => {
          navigate('/admin'); // First try with navigate()
          window.location.reload(); // Force reload if navigate() fails
        }, 2000);
      } else {
        toast.error(data.message || 'Login failed', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Something went wrong', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <section>
      <ToastContainer />
      <div>
        <img
          className="w-screen object-cover pt-20 lg:h-max lg:-translate-y-12"
          src={Banner}
          alt="banner"
        />
        <h1 className="-translate-y-10 text-center text-3xl font-bold tracking-widest text-white lg:-translate-y-28 lg:text-5xl">
          Sign In
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-4 flex h-96 flex-col items-center justify-center space-y-4 rounded-md bg-zinc-900 p-6 lg:mx-96"
      >
        <label className="text-2xl text-white">E-mail</label>
        <input
          className="h-10 w-80 rounded-md border border-gray-300 px-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="fit4life@fit4life.com"
          required
        />

        <label className="text-2xl text-white">Password</label>
        <input
          className="h-10 w-80 rounded-md border border-gray-300 px-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="rounded-md bg-[#0f766e] px-6 py-2 text-lg text-white hover:bg-[#0f766e]/80"
        >
          Sign In
        </button>
      </form>
      <Footer />
    </section>
  );
};

export default User;
