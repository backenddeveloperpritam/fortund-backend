import Joi from "joi";

import { sortBy } from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";

const searchState = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};


const getStateId = {
    params: Joi.object().keys({
        stateId: Joi.string().custom(objectId),
    }),
};

const addNewState = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        country: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};
const stateByCountryId = {
    body: Joi.object().keys({
        countryId: Joi.string().required(),
    }),
};

const updateState = {
    params: Joi.object().keys({
        stateId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        country: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};


const deleteState = {
    body: Joi.object().keys({
        stateId: Joi.string().required(),
    }),
};

export {
    searchState,
    getStateId,
    addNewState,
    updateState,
    deleteState,
    stateByCountryId
};