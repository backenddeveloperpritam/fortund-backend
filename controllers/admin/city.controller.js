import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as cityService from '../../services/city.service.js';
import httpStatus from 'http-status';

const cityList = asyncHandler(async (req, res) => {
    const result = await cityService.getCity();

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "City Not found !");
    }

    return res.status(200).json(new ApiResponse(200, result, "City fetched successfully"));
});

const cityById = asyncHandler(async (req, res) => {

    const result = await cityService.getCityById(req.params.cityId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No City found with matching id");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "City fetch successfully")
        )
});


const addNewCity = asyncHandler(async (req, res) => {
    const { title, stateId, status } = req.body;
    const result = await cityService.addNewCity(title, stateId, status);

    return res
        .status(200)
        .json({ success: true, result, message: "City added successfully" });

});


const updateCityById = asyncHandler(async (req, res) => {
    const { cityId } = req.params;
    const updateData = req.body;

    const result = await cityService.updateCity(cityId, updateData);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "City Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, result, "City Updated successfully."));

});


const deleteCity = asyncHandler(async (req, res) => {
    const { cityId } = req.body;
    const result = await cityService.deleteCity(cityId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No City found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "City delleted successfully"));
});


export { cityList, cityById, addNewCity, updateCityById, deleteCity };
