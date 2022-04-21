import { useEffect, useState, useReducer } from 'react';
import fetcher from '../utils/fetcher';

const initialState = {
  experience: [],
};

const initialNew = {
  company: '',
  title: '',
  start_date: '',
  end_date: '',
  description: ''
};

function Experience({ user, mutateUser }) {
  console.log(user.experience)

  const [fields, setFields] = useState(initialState);
  const [newFields, setNewFields] = useState(initialNew);

  useEffect(() => {
    setFields({
      experience: user.experience
    })

  }, [user]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...fields.experience];
    list[index][name] = value;
    setFields({ ...fields, experience: list });
  };

  const handleChangeNew = (e) => {
    setNewFields({ ...newFields, [e.target.name]: e.target.value });
  };

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    mutateUser('/api/auth/profile', {}, false);

    try {
      // PUT request after user update the profile
      // return: success: true, message, user: user session updated
      const result = await fetcher('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experience: [...fields.experience, newFields]
        }),
      });

      // page will be reload
      setNewFields(initialNew);
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
    <div className="flex flex-wrap">
      {fields.experience && fields.experience.map((exp, index) => {
        return (
          <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md m-4">
          <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Experience
          </div>
          <div class="mt-10">
            <form onSubmit={handleSubmit}>
              <div class="flex flex-col mb-5">
                <label
                  for="email"
                  class="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Logo:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
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
                  Company:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-5">
                <label
                  for="email"
                  class="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Title:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your Job Title"
                    value={exp.title}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-5">
                <label
                  for="email"
                  class="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Start Date:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="start_date"
                    type="date"
                    name="start_date"
                    class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    value={exp.start_date}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-5">
                <label
                  for="email"
                  class="mb-1 text-xs tracking-wide text-gray-600"
                >
                  End Date:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="end_date"
                    type="date"
                    name="end_date"
                    class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    value={exp.end_date}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-5">
                <label
                  for="email"
                  class="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Description:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i class="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your job description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
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
      })}

      <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md m-4">
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Experience
        </div>
        <div class="mt-10">
          <form onSubmit={handleSubmitNew}>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Logo:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
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
                Company:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="company"
                  type="text"
                  name="company"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your company"
                  value={newFields.company}
                  onChange={handleChangeNew}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Title:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="title"
                  type="text"
                  name="title"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your Job Title"
                  value={newFields.title}
                  onChange={handleChangeNew}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Start Date:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="start_date"
                  type="date"
                  name="start_date"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  value={newFields.start_date}
                  onChange={handleChangeNew}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                End Date:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="end_date"
                  type="date"
                  name="end_date"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  value={newFields.end_date}
                  onChange={handleChangeNew}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Description:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="description"
                  type="text"
                  name="description"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your job description"
                  value={newFields.description}
                  onChange={handleChangeNew}
                />
              </div>
            </div>
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
    </div>
  );
}

export default Experience;