import express from 'express';
import validate from "../../middlewares/validate.js";
import * as stateValidation from '../../validations/state.validation.js';
import * as stateController from '../../controllers/admin/state.controller.js';

const router = express.Router();

router.get(
    "/state",
    stateController.stateList
);

router.get(
    "/state/:stateId",
    validate(stateValidation.getStateId),
    stateController.stateById
);

router.post("/state/country-states",
    validate(stateValidation.stateByCountryId),
    stateController.stateByCountryId
);

router.post("/add-new-state",
    validate(stateValidation.addNewState),
    stateController.addNewState
);
router.post("/add-new-state",
    validate(stateValidation.stateByCountryId),
    stateController.stateByCountryId
);

router.post("/state/update/:stateId",
    validate(stateValidation.updateState),
    stateController.updateStateById
);

router.post("/state/delete",
    validate(stateValidation.deleteState),
    stateController.deleteState
);


export default router;
