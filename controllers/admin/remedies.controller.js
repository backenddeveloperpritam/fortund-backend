import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as RemediesService from '../../services/Remedies.service.js';
import httpStatus from 'http-status';


const remediesList = asyncHandler(async (req, res) => {
   
    const result = await RemediesService.getRemedies();

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Remedies fetched successfully"));

});

const getRemediesById = asyncHandler(async (req, res) => {
    console.log('test');
    const result = await RemediesService.getRemediesById(req.params.expertiseId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Remedies found with matching id");
    }
    return res.status(200).json(new ApiResponse(200, result, "Remedies fetched successfully"));

});


const addNewRemedies = asyncHandler(async (req, res) => {
    const result = await RemediesService.addNewRemedies(req.body);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Remedies Not added !");
    }
    return res.status(200).json(new ApiResponse(200, result, "Remedies added successfully."));

});


const updateRemedies = asyncHandler(async (req, res) => {
    const { expertiseId } = req.params;
    const updateData = req.body;

    const updatedSkill = await RemediesService.updateRemedies(expertiseId, updateData);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Remedies Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Remedies Updated successfully."));

});



const changeStatus = asyncHandler(async (req, res) => {
    const { expertiseId, status } = req.body;
    const result = await RemediesService.changeStatus(expertiseId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Remedies found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Remedies Updated successfully"));
})

const deleteRemedies = asyncHandler(async (req, res) => {
    const { expertiseId } = req.body;
    const result = await RemediesService.deleteRemedies(expertiseId);

    return res.status(200).json(new ApiResponse(200, {}, "Remedies delleted successfully"));
})


export { remediesList, getRemediesById, addNewRemedies, updateRemedies, changeStatus, deleteRemedies };
