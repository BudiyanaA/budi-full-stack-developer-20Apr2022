import { useAppState } from '../../provider';
import Sidebar from '../../components/common/Sidebar';
import { Basic, Contact, Experience } from '../../containers';
import useUser from '../../lib/useUser';

export default function Profile() {
  const { sidebarActive } = useAppState();
  let RenderMenu = Basic;
  const { user, mutateUser } = useUser({
    redirectTo: '/login',
  });

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
    <Sidebar user={user} mutateUser={mutateUser}>
      <RenderMenu user={user} mutateUser={mutateUser} />
    </Sidebar>
  );
}