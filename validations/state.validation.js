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
        countryId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};
const cityByStateId = {
    body: Joi.object().keys({
        stateId: Joi.string().required(),
    }),
};

const updateState = {
    params: Joi.object().keys({
        stateId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        countryId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};
const changeStatus = {
    body: Joi.object().keys({
        stateId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").required(),
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
    cityByStateId,
    changeStatus
};