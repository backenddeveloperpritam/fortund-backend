import State from "../models/adminModel/State.js";
import ApiError from "../utils/ApiError.js";
import City from "../models/adminModel/City.js";

const getState = async () => {
    const result = await State.find({});
    return result;
};

const getStateById = async (id) => {
    const result = State.findOne({ _id: id });
    return result;
}

const addNewState = async (title, countryId, status) => {

    const existState = await State.findOne({ title: new RegExp('^' + title + '$', 'i') });

    if (existState) {
        throw new ApiError(400, "State already exist");
    }

    const result = await State.create({
        title,
        countryId,
        status
    });

    return result;
}

const updateState = async (stateId, updateData) => {
    const result = await State.findByIdAndUpdate(stateId, updateData, { new: true });
    return result;
}

const getCityByStateId = async (stateId) => {
    const restul = await City.find({ stateId: stateId });
    return restul;
}

const deleteState = async (stateId) => {
    const result = await State.findByIdAndUpdate(
        stateId,
        { isDeleted: 1 },
        { new: true }
    );

    return result;
};

const changeStatus = async (stateId, status) => {
    const result = await State.findByIdAndUpdate(
        stateId,
        { status },
        { new: true }
    );

    return result;
};

export { getState, getStateById, addNewState, updateState, getCityByStateId, changeStatus, deleteState };
