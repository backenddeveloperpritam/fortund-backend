import Joi from "joi";
import { sortBy } from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";

const searchCity = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};

const getCityId = {
    params: Joi.object().keys({
        cityId: Joi.string().custom(objectId),
    }),
};

const addNewCity = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        stateId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};
const cityByCityId = {
    params: Joi.object().keys({
        cityId: Joi.string().custom(objectId).required(),
    }),
};

const updateCity = {
    params: Joi.object().keys({
        cityId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        stateId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};


const deleteCity = {
    body: Joi.object().keys({
        cityId: Joi.string().required(),
    }),
};

export {
    searchCity,
    getCityId,
    addNewCity,
    updateCity,
    deleteCity,
    cityByCityId
};