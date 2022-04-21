import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faFile } from "@fortawesome/free-solid-svg-icons";
import items from '../../constants/sidebar';
import { useAppState } from '../../provider';
import Link from 'next/link'
import fetcher from '../../utils/fetcher';

function Sidebar({ children, active, user, mutateUser }) {
  const router = useRouter();
  const { setSidebarActive, sidebarActive } = useAppState();
  const [message, setMessage] = useState('Message');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleClick = (index) => {
    setSidebarActive(index);
    router.push('/profile');
  };
  
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await mutateUser(
        fetcher(`/api/auth/session`, {
          method: 'DELETE',
        })
      );
    } catch (err) {
      console.error(err);

      // setMessage(err.data.error.message);
      // setIsFeedbackOpen(true);
    }
  };
  
  const loading = !user?.isLoggedIn;

  return (
    <div className='flex flex-row'>
      <div className='w-1/4 border-r border-gray-400 min-h-screen flex flex-col justify-between py-5'>
        <div>
          {loading ? (
            <div className='animate-pulse px-3 py-3 bg-gray-300 h-16 rounded-md mx-4' />
          ) : (
            <>
              <div className='my-2 mx-4'>
                <Image
                  src={user.photos}
                  alt='Profile Picture'
                  width={100}
                  height={100}
                />
              </div>
              <div className='mx-4'>
                {user.username}
              </div>
            </>
          )}

          <div className='my-9 mx-4'>
            <p className='text-gray-800 font-semibold'>Menu</p>
            <div className='my-2'>
              {items.map((item, index) => {
                return (
                  <div key={index}>
                    <button 
                      className={`group inline-flex w-full rounded-md px-2 py-2 gap-3 cursor-pointer ${
                        sidebarActive === index
                          ? 'bg-black bg-opacity-10'
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => handleClick(index)}
                    >
                      <span
                        className={`capitalize text-left ${
                          sidebarActive === index
                            ? 'text-secondary'
                            : 'text-gray-600 group-hover:text-white'
                        }`}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <p 
                        className={`capitalize text-left ${
                          sidebarActive === index
                            ? 'text-secondary'
                            : 'text-gray-600 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </p>
                    </button>
                  </div>
                );
              })}
              <div>
                <Link href="/resumes/id" passHref={true}>
                  <button 
                    className="group inline-flex w-full rounded-md px-2 py-2 gap-3 cursor-pointer hover:bg-secondary"
                    onClick={() => {}}
                  >
                    <span className="capitalize text-left text-gray-600 group-hover:text-white">
                      <FontAwesomeIcon icon={faFile} />
                    </span>
                    <p className="capitalize text-left text-gray-600 group-hover:text-white">
                      My Resume
                    </p>
                  </button>
                </Link>
              </div>
              <div>
                  <button 
                    className="group inline-flex w-full rounded-md px-2 py-2 gap-3 cursor-pointer hover:bg-secondary"
                    onClick={handleLogout}
                  >
                    <span className="capitalize text-left text-gray-600 group-hover:text-white">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </span>
                    <p className="capitalize text-left text-gray-600 group-hover:text-white">
                      Logout
                    </p>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container px-10 py-5 bg-light bg-opacity-50'>
        {children}
      </div>
    </div>
  );
}
  
export default Sidebar;
