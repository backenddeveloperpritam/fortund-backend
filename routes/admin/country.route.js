import express from 'express';
import validate from "../../middlewares/validate.js";
import * as countryValidation from '../../validations/country.validation.js';
import * as countryController from '../../controllers/admin/country.controller.js';

const router = express.Router();

router.get(
    "/country",
    countryController.countryList
);

router.get(
    "/country/:countryId",
    validate(countryValidation.getCountryId),
    countryController.countryById
);

router.post("/add-new-country",
    validate(countryValidation.addNewCountry),
    countryController.addNewCountry
);

router.post("/country/update/:countryId",
    validate(countryValidation.updateCountry),
    countryController.updateCountryById
);

router.post("/country/delete",
    validate(countryValidation.deleteCountry),
    countryController.deleteCountry
);


export default router;
