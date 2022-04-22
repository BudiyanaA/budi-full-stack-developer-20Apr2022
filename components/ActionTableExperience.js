import { Fragment } from 'react';
import { Menu as MenuCustom, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

function ActionTableExperience(props) {
  const { children, onEdit, onDelete, onView } = props;

  return (
    <MenuCustom as='div' className='relative inline-block text-left z-10'>
      <div>
        <MenuCustom.Button>{children}</MenuCustom.Button>
      </div>
      <div className='fixed'>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <MenuCustom.Items className='absolute right-0 w-44 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <MenuCustom.Item>
                {({ active }) => (
                  <button
                    onClick={onView}
                    className={`${
                      active ? 'bg-blue-400 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FontAwesomeIcon 
                        className='w-5 h-5 mr-2' 
                        aria-hidden='true'
                        icon={faEye} 
                      />
                    ) : (
                      <FontAwesomeIcon 
                        className={`w-5 h-5 mr-2 ${!active && 'text-blue-500'}`}
                        aria-hidden='true'
                        icon={faEye} 
                      />
                    )}
                    Lihat
                  </button>
                )}
              </MenuCustom.Item>
              <MenuCustom.Item>
                {({ active }) => (
                  <button
                    onClick={onEdit}
                    className={`${
                      active ? 'bg-blue-400 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FontAwesomeIcon 
                        className='w-5 h-5 mr-2' 
                        aria-hidden='true'
                        icon={faPencil} 
                      />
                    ) : (
                      <FontAwesomeIcon 
                        className={`w-5 h-5 mr-2 ${!active && 'text-blue-500'}`}
                        aria-hidden='true'
                        icon={faPencil} 
                      />
                    )}
                    Edit
                  </button>
                )}
              </MenuCustom.Item>
              <MenuCustom.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={`${
                      active ? 'bg-red-400 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FontAwesomeIcon 
                        className='w-5 h-5 mr-2' 
                        aria-hidden='true'
                        icon={faTrash} 
                      />
                    ) : (
                      <FontAwesomeIcon 
                        className={`w-5 h-5 mr-2 ${!active && 'text-blue-500'}`}
                        aria-hidden='true'
                        icon={faTrash} 
                      />
                    )}
                    Hapus
                  </button>
                )}
              </MenuCustom.Item>
            </div>
          </MenuCustom.Items>
        </Transition>
      </div>
    </MenuCustom>
  );
}

ActionTableExperience.propTypes = {
  children: PropTypes.any.isRequired,
  onPreview: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionTableExperience;
