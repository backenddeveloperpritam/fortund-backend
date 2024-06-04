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

router.post("/state/city",
    validate(stateValidation.cityByStateId),
    stateController.cityByStateId
);

router.post("/add-new-state",
    validate(stateValidation.addNewState),
    stateController.addNewState
);

router.post("/state/update/:stateId",
    validate(stateValidation.updateState),
    stateController.updateStateById
);

router.post("/state/delete",
    validate(stateValidation.deleteState),
    stateController.deleteState
);

router.post("/state/change-status",
    validate(stateValidation.changeStatus),
    stateController.changeStatus
);


export default router;
