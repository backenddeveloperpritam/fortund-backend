import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as stateService from '../../services/state.service.js';
import httpStatus from 'http-status';

const stateList = asyncHandler(async (req, res) => {
    const result = await stateService.getState();

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "State Not found !");
    }

    return res.status(200).json(new ApiResponse(200, result, "State fetched successfully"));
});

const stateById = asyncHandler(async (req, res) => {


    const result = await stateService.getStateById(req.params.stateId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No State found with matching id");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "State fetch successfully")
        )
});

const cityByStateId = asyncHandler(async (req, res) => {
    const result = await stateService.getCityByStateId(req.body.stateId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No State found with matching id");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "State fetch successfully")
        )

});

const addNewState = asyncHandler(async (req, res) => {
    const { title, countryId, status } = req.body;
    const result = await stateService.addNewState(title, countryId, status);

    return res
        .status(200)
        .json({ success: true, result, message: "State added successfully" });

});


const updateStateById = asyncHandler(async (req, res) => {
    const { stateId } = req.params;
    const updateData = req.body;

    const result = await stateService.updateState(stateId, updateData);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "State Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, result, "State Updated successfully."));

});


const deleteState = asyncHandler(async (req, res) => {
    const { stateId } = req.body;
    const result = await stateService.deleteState(stateId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No State found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "State delleted successfully"));
});

const changeStatus = asyncHandler(async (req, res) => {
    const { stateId, status } = req.body;
    const result = await stateService.changeStatus(stateId, status);

    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, " State Not found");
    }

    return res.status(200).json(new ApiResponse(200, result, "State Updated successfully"));
})

export { stateList, stateById, addNewState, updateStateById, cityByStateId, changeStatus, deleteState };
