import { useEffect, useState, useReducer } from 'react';
import Modal from './common/Modal';
import fetcher from '../utils/fetcher';

const initialState = {
  company: '',
  title: '',
  start_date: '',
  end_date: '',
  description: ''
};

const initialResponse = {
  type: '',
  message: '',
};

function ModalExperience({
  open,
  setOpen,
  onClose,
  type,
  mutate,
  experience,
  index,
}) {
  const [fields, setFields] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(initialResponse);

  useEffect(() => {
    if (type !== 'add') {
      setFields(experience);
    }

    if (!open) {
      // setResponse(initialResponse);
      // setFormErrors(initialState);
      setFields(initialState);
    }

    // if (!!response.type) {
    //   setOpen(true);
    // }
  }, [experience, open, setOpen, type]);
  
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const addExperience = async () => {
    // mutate(`/api/experience`, {}, false);

    try {
      // PUT request after user update the profile
      // return: success: true, message, user: user session updated
      const result = await fetcher('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      // page will be reload
      mutate(`/api/experience`);
      setIsLoading(false);
      setResponse({
        type: 'success',
        message: result.message,
      });
      // setIsOpenFeedback(true);

      // return setTimeout(() => {
      //   router.reload();
      // }, 5000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      // if (err.data.success && err.data.success === false) {
      //   return setResponse(err.data.errors);
      // }
      setResponse({
        type: 'error',
        message: err.data.error.message,
      });
    }
  }

  const updateExperience = async () => {
    setIsLoading(true);

    try {
      const res = await fetcher(`/api/experience?index=${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      setResponse({
        type: 'success',
        message: res.message,
      });

      mutate(`/api/experience`);
      setIsLoading(false);
      
    } catch (err) {
      console.error(err);

      if (!err.data.success && err.data.errors) {
        setFormErrors(err.data.errors);

        return setIsLoading(false);
      }

      setResponse({
        type: 'error',
        message: err.data.error.message,
      });

      return setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(initialResponse);
    // setFormErrors(initialState);
    setIsLoading(true);

    if (type === 'add') {
      return await addExperience();
    }

    return await updateExperience();
  };

  const titleModal =
  (type === 'view' &&
    !response.type &&
    !isLoading &&
    'View Experience') ||
  (type === 'add' &&
    !response.type &&
    !isLoading &&
    'Add Experience') ||
  (type === 'edit' &&
    !response.type &&
    !isLoading &&
    'Edit Experience') ||
  (response.type === 'error' && isLoading && '') ||
  (response.type === 'success' && isLoading && '');

  return (
    <Modal open={open} onClose={onClose} title={titleModal} align='center'>
      { isLoading ? (
        <div className={`text-gray-500 text-center mb-2`}>Please wait...</div>
      ) : !response.type ? (
        <div class="mt-10">
        <form onSubmit={handleSubmit}>
          {/* <div class="flex flex-col mb-5">
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
          </div> */}
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
                value={fields.company}
                onChange={handleChange}
                required={true}
                disabled={type == 'view'}
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
                value={fields.title}
                onChange={handleChange}
                required={true}
                disabled={type == 'view'}
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
                value={fields.start_date}
                onChange={handleChange}
                required={true}
                disabled={type == 'view'}
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
                value={fields.end_date}
                onChange={handleChange}
                disabled={type == 'view'}
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
                value={fields.description}
                onChange={handleChange}
                required={true}
                disabled={type == 'view'}
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
      ) : (
        <div
          className={`${response.type === 'error' && 'text-red-500'} ${
            response.type === 'success' && 'text-green-500'
          } text-center mb-2`}
        >
          {response.message}
        </div>
      )}
    </Modal>
  );
}

export default ModalExperience;