import Joi from "joi";
import { sortBy } from '../utils/values.js';
import { objectId } from "./custom.validation.js";

// Define the schema for remedies
const remediesSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive').required(),  // Correct capitalization for 'Inactive'
});

// Define the schema for getting remedies
const getRemedies = {
    query: Joi.object({
        title: Joi.string().optional(),  // Make title optional for filtering
        sortBy: Joi.string().valid(...sortBy).optional(),  // Make sortBy optional
    }),
};

// Define the schema for getting a single remedy by ID
const getRemediesById = {
    params: Joi.object({
        remediesId: Joi.string().custom(objectId).required(),
    }),
};

// Define the schema for adding new remedies
const addNewRemedies = {
    body: remediesSchema,
};

const updateRemedies = {
    params: Joi.object({
        remediesId: Joi.string().custom(objectId).required(),
    }),
    body: remediesSchema,
};

const changeStatus = {
    body: Joi.object({
        remediesId: Joi.string().custom(objectId).required(),
        status: Joi.string().valid('Active', 'InActive').required(),
    }),
};

// Define the schema for deleting remedies
const deleteRemedies = {
    body: Joi.object({
        remediesId: Joi.string().custom(objectId).required(),
    }),
};

export {
    getRemedies,
    getRemediesById,
    addNewRemedies,
    updateRemedies,
    changeStatus,
    deleteRemedies
};
