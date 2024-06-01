import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as countryService from '../../services/country.service.js';
import httpStatus from 'http-status';

const countryList = asyncHandler(async (req, res) => {
    const result = await countryService.getCountry();

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Country Not found !");
    }

    return res.status(200).json(new ApiResponse(200, result, "Country fetched successfully"));
});

const countryById = asyncHandler(async (req, res) => {


    const result = await countryService.getCountryById(req.params.countryId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No country found with matching id");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "country fetch successfully")
        )


});

const addNewCountry = asyncHandler(async (req, res) => {
    const { title, code, status } = req.body;
    const result = await countryService.addNewCountry(title, code, status);

    return res
        .status(200)
        .json({ success: true, result, message: "Country added successfully" });

});


const updateCountryById = asyncHandler(async (req, res) => {
    const { countryId } = req.params;
    const updateData = req.body;

    const result = await countryService.updateCountry(countryId, updateData);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Country Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, result, "Country Updated successfully."));

});



const deleteCountry = asyncHandler(async (req, res) => {
    const { countryId } = req.body;
    const result = await countryService.deleteCountry(countryId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Country found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Country delleted successfully"));
});

export { countryList, countryById, addNewCountry, updateCountryById, deleteCountry };
