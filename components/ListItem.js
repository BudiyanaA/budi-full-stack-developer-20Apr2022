import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

function ListItem({ text }) {
  return (
    <div className="my-1">
      <FontAwesomeIcon icon={faBolt} />
      <span className="inline-block font-medium ml-2">{text}</span>
    </div>
  );
}

export default ListItem;