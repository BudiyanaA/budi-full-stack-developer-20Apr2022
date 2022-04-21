import { useEffect, useState, useReducer } from 'react';
import fetcher from '../utils/fetcher';
import router from 'next/router';

function Basic({ user, mutateUser }) {
  
  const [fields, setFields] = useState({
    photos: user?.isLoggedIn && user.photos,
    fullname: user?.isLoggedIn && user.fullname,
    age: user?.isLoggedIn && user.age,
  });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutateUser('/api/auth/profile', {}, false);

    try {
      // PUT request after user update the profile
      // return: success: true, message, user: user session updated
      const result = await fetcher('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      // page will be reload
      mutateUser('/api/auth/profile');
      // setResponse(result.message);
      // setIsOpenFeedback(true);

      // return setTimeout(() => {
      //   router.reload();
      // }, 5000);
    } catch (err) {
      console.error(err);

      // if (err.data.success && err.data.success === false) {
      //   return setResponse(err.data.errors);
      // }
      // return setResponse(err.data.error.message);
    }
  };

  return (
    <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
      <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
        Basic Profile
      </div>
      <div class="mt-10">
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >
              Foto:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-portrait text-blue-500"></i>
              </div>
              <input
                id="email"
                type="file"
                name="email"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >
              Fullname:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-user text-blue-500"></i>
              </div>
              <input
                id="fullname"
                type="text"
                name="fullname"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your fullname"
                value={fields.fullname}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >
              Age:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-birthday-cake text-blue-500"></i>
              </div>
              <input
                id="age"
                type="number"
                name="age"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your age"
                value={fields.age}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          {/* <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >
              Role:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-at text-blue-500"></i>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >
              Bio:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-at text-blue-500"></i>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
              />
            </div>
          </div> */}
          <div class="flex w-full">
            <button
              type="submit"
              class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Basic;