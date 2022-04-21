import nc from 'next-connect';
import { onError, onNoMatch } from '../../controllers/middleware/error-handler';
import { withSession } from '../../controllers/middleware/session-handler';

import {
  getAllUsers,
} from '../../controllers/routes/users';

export default withSession(
  nc({ onError, onNoMatch })
    .get(getAllUsers)
);
