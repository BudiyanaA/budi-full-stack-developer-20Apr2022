import ActionTableExperience from './ActionTableExperience';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons"

function TableExperience ({ experience, onDelete }) {
  
  const handleDelete = (index) => {
    return onDelete(index);
  };

  return (
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='py-2 align-middle inline-unit min-w-full sm:px-6 lg:px-8'>
        <div className='shadow overflow-hidden border-b border-gray-200'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-white'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Company
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Start Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  End Date
                </th>
                <th scope='col' className='relative px-6 py-3'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            {!experience ? (
              <div>Loading ...</div>
            ) : experience && experience.length === 0 ? ( 
              <div>Empty Data</div>
            ):(
            <tbody className='bg-white divide-y divide-gray-200'>
            {experience.map((exp, index) => (
              <tr key={index} className='even:bg-gray-100'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs'>
                  { exp.company }
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs'>
                  { exp.title }
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs'>
                  { exp.start_date }
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs'>
                  { exp.end_date }
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right'>
                  <ActionTableExperience
                    // onEdit={() => (handleEdit(grade))}
                    onDelete={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon className='text-gray-500 w-5 h-5 cursor-pointer' icon={faEllipsisVertical} />
                  </ActionTableExperience>
                </td>
              </tr>
            ))}
            </tbody>
          )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableExperience;