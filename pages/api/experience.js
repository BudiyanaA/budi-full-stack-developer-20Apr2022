import nc from 'next-connect';
import { onError, onNoMatch } from '../../controllers/middleware/error-handler';
import { withSession } from '../../controllers/middleware/session-handler';

import {
  getAllExperience,
  createExperience,
  deleteExperience,
  editExperience,
} from '../../controllers/routes/experience';

export default withSession(
  nc({ onError, onNoMatch })
    .get(getAllExperience)
    .post(createExperience)
    .delete(deleteExperience)
    .put(editExperience)
);
