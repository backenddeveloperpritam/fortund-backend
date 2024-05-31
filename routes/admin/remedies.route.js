import express from 'express';
import validate from "../../middlewares/validate.js";
import * as RemediesValidation from '../../validations/remedies.validation.js';
import * as RemediesController from '../../controllers/admin/remedies.controller.js';
import { verifyJWT } from '../../middlewares/auth.middleware.js';
const router = express.Router();

router.get("/remedies",
    RemediesController.remediesList
);

router.get("/remedies/:expertiseId",
    validate(RemediesValidation.getRemediesById),
    RemediesController.getRemediesById
);

router.post("/add-new-remedies",
    validate(RemediesValidation.addNewRemedies),
    RemediesController.addNewRemedies
);

router.post("/update-remedies/:remediesId",
    validate(RemediesValidation.updateRemedies),
    RemediesController.updateRemedies
);

router.post("/remedies/change-status",
    validate(RemediesValidation.changeStatus),
    RemediesController.changeStatus
);

router.post("/remedies/delete",
    validate(RemediesValidation.deleteRemedies),
    RemediesController.deleteRemedies
);

export default router;
