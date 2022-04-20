import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faFile } from "@fortawesome/free-solid-svg-icons";
import items from '../../constants/sidebar';
import { useAppState } from '../../provider';
import Link from 'next/link'

function Sidebar({ children }) {
  const router = useRouter();
  const { setSidebarActive, sidebarActive } = useAppState();

  const handleClick = (index) => {
    setSidebarActive(index);
    router.push('/profile');
  };
  
  return (
    <div className='flex flex-row'>
      <div className='w-1/4 border-r border-gray-400 min-h-screen flex flex-col justify-between py-5'>
        <div>
          <div className='my-2 mx-4'>
            <Image
              src='https://i.pravatar.cc/1000'
              alt='Workflow'
              width={100}
              height={100}
            />
          </div>

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
                <Link href="/resumes/id">
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
                <Link href="/">
                  <button 
                    className="group inline-flex w-full rounded-md px-2 py-2 gap-3 cursor-pointer hover:bg-secondary"
                    onClick={() => {}}
                  >
                    <span className="capitalize text-left text-gray-600 group-hover:text-white">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </span>
                    <p className="capitalize text-left text-gray-600 group-hover:text-white">
                      Logout
                    </p>
                  </button>
                </Link>
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
