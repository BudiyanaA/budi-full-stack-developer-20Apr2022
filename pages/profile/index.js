import { useAppState } from '../../provider';
import Sidebar from '../../components/common/Sidebar';
import { Basic, Contact, Experience } from '../../containers';

export default function Profile() {
  const { sidebarActive } = useAppState();
  let RenderMenu = Basic;

  switch (sidebarActive) {
    case 0:
      RenderMenu = Basic;
      break;
    case 1:
      RenderMenu = Contact;
      break;
    case 2:
      RenderMenu = Experience;
      break;
    default:
      new Error('Render menu undefined!');
  }

  return (
    <Sidebar>
      <RenderMenu/ >
    </Sidebar>
  );
}