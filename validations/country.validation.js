import Joi from "joi";

import { sortBy } from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";
import { query } from "express";

const searchCountry = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};


const getCountryId = {
    params: Joi.object().keys({
        countryId: Joi.string().custom(objectId),
    }),
};

const addNewCountry = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        code: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};

const updateCountry = {
    params: Joi.object().keys({
        countryId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        code: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};


const deleteCountry = {
    body: Joi.object().keys({
        countryId: Joi.string().required(),
    }),
};

const getStateByCountry = {
    body: Joi.object().keys({
        countryId: Joi.string().required(),
    }),
};

export {
    searchCountry,
    getCountryId,
    addNewCountry,
    updateCountry,
    deleteCountry,
    getStateByCountry
};