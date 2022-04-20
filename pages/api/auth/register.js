import nc from 'next-connect';
import { onError, onNoMatch } from '../../../controllers/middleware/error-handler';
import { withSession } from '../../../controllers/middleware/session-handler';

import {
  register,
} from '../../../controllers/routes/auth';

export default withSession(
  nc({ onError, onNoMatch })
    .post(register)
);
