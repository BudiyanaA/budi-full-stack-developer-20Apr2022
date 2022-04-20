import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faGlobe,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function ResumeContact({ field, value }) {
  return (
    <span className="flex my-2 text-primary-900 tracking-widest items-center">
      {field === 'email' && (
        <>
          <FontAwesomeIcon icon={faEnvelope} />
          <a className="contact-link pl-2" href={`mailto:${value}`} title="email">
            {value}
          </a>
        </>
      )}
      {field === 'phone' && (
        <>
          <FontAwesomeIcon icon={faPhone} />
          <a className="contact-link pl-2" href={`tel:${value}`} title="phone">
            {value}
          </a>
        </>
      )}
      {field === 'website' && (
        <>
          <FontAwesomeIcon icon={faGlobe} />
          <a
            className="contact-link pl-2"
            target="_blank"
            href={value}
            rel="noopener noreferrer"
            title="website"
          >
            Personal Site
          </a>
        </>
      )}
      {field === 'location' && (
        <>
          <FontAwesomeIcon icon={faLocationDot} />
          <span className="contact-link pl-2">{value}</span>
        </>
      )}
    </span>
  );
}

export default ResumeContact;