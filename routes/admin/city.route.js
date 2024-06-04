import express from 'express';
import validate from "../../middlewares/validate.js";
import * as cityValidation from '../../validations/city.validation.js';
import * as cityController from '../../controllers/admin/city.controller.js';

const router = express.Router();

router.get(
    "/city",
    cityController.cityList
);

router.get(
    "/city/:cityId",
    validate(cityValidation.cityByCityId),
    cityController.cityById
);

router.post("/add-new-city",
    validate(cityValidation.addNewCity),
    cityController.addNewCity
);

router.post("/city/update/:cityId",
    validate(cityValidation.updateCity),
    cityController.updateCityById
);

router.post("/city/delete",
    validate(cityValidation.deleteCity),
    cityController.deleteCity
);

router.post("/city/change-status",
    validate(cityValidation.changeStatus),
    cityController.changeStatus
);

export default router;
