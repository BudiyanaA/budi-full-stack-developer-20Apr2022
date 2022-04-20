import PropTypes from 'prop-types';
import initialName from '../../utils/initialName';

function Avatar(props) {
  const { fullname, color, size } = props;

  // Get initial user from fullname
  const initial = initialName(fullname);

  return (
    <div
      className={`inline-block rounded-full ring-2 ring-white ${
        color === 'red' && 'bg-red-500'
      }  ${color === 'blue' && 'bg-blue-500'}  ${
        color === 'yellow' && 'bg-yellow-500'
      }  ${color === 'green' && 'bg-green-500'}  ${
        color === 'indigo' && 'bg-indigo-500'
      } ${color === 'purple' && 'bg-purple-500'} ${
        color === 'pink' && 'bg-pink-500'
      }   ${size === 'sm' ? 'w-7 h-7' : 'h-10 w-10'}`}
    >
      <p
        className={`text-center flex justify-center items-center font-medium text-white h-full w-full ${
          size === 'sm' && 'text-xs'
        }`}
      >
        {initial}
      </p>
    </div>
  );
}

Avatar.propTypes = {
  fullname: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Avatar;
