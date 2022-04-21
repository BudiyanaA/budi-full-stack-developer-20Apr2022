import { useEffect, useState, useRef } from 'react';
import fetcher from '../utils/fetcher';
import router from 'next/router';
import Image from 'next/image';
import toBase64 from '../utils/toBase64';

function Basic({ user, mutateUser }) {
  
  const ref = useRef();
  const [thumbnail, setThumbnail] = useState('');
  const [photos, setPhotos] = useState({
    name: '',
    source: '',
  });

  const [fields, setFields] = useState({
    photos: user?.isLoggedIn && user.photos,
    fullname: user?.isLoggedIn && user.fullname,
    age: user?.isLoggedIn && user.age,
  });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleFileThumbnail = async (file) => {
    const source = await toBase64(file);
    setPhotos({ name: file.name, source: source });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    // setError('');

    // if ((file && file.size / 1024 / 1024) > 3) {
    //   ref.current.value = '';
    //   return setError('File too large, max 3mb');
    // }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      handleFileThumbnail(file);
      setThumbnail(reader.result);
    };
    reader.onerror = function (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    setThumbnail(
      'https://firebasestorage.googleapis.com/v0/b/madava-project.appspot.com/o/public%2Fimages%2Fthumbnail-default.jpg?alt=media&token=550b5331-54db-4fea-91b7-963bb1054b50'
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutateUser('/api/auth/profile', {}, false);

    try {
      // PUT request after user update the profile
      // return: success: true, message, user: user session updated
      const result = await fetcher('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photos: photos,
          fullname: fields.fullname,
          age: fields.age
        }),
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
            <div className='w-1/2 h-auto mt-1'>
              {!thumbnail ? (
                <div className='bg-gray-300 w-8 h-8 rounded-md px-1 py-1 animate-pulse' />
              ) : (
                <Image
                  width={200}
                  height={200}
                  src={thumbnail}
                  alt='thumbnail'
                  layout='intrinsic'
                  objectFit='cover'
                  quality={65}
                />
              )}
            </div>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-portrait text-blue-500"></i>
              </div>
              <input
                id="photos"
                type="file"
                name="photos"
                class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
                onChange={handleChangeFile}
                ref={ref}
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