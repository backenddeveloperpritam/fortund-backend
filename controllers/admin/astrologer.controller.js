import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerService from '../../services/astrologer.service.js';
import httpStatus from 'http-status';


const astrologerList = asyncHandler(async (req, res) => {

    const title = req.query.title || "";

    const result = await astrologerService.getAstrologer(title);

    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Astrologers fetched successfully"));

});

const getAstrologerById = asyncHandler(async (req, res) => {
    try {
        const result = await astrologerService.getAstrologerById(req.params.astrologerId);
        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found with matching id");
        }
        return res.status(200).json(new ApiResponse(200, result, "Astrologer fetched successfully"));
    } catch (error) {
        console.error("Error:", error);
        throw new ApiError(500, "Something went wrong, Astrologer not fetched by id");
    }
});


const addNewAstrologer = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.addNewAstrologer(req.body, req.files);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer Not added !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Astrologer added successfully."));

});

const updateAstrologer = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.updateAstrologer(req.body);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer Not Found !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Astrologer Updated successfully."));

});

const updateProfile = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.updateProfileImage(req.body, req.file);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer Not found !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Astrologer profile updated successfully."));

})

const updateGallery = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.updateProfileGalleryImage(req.body, req.files);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer Not found !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Astrologer Gallery updated successfully."));

})

const changeCallStatusAllAstrologer = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.updateCallStatusAllAstrologer(req.body);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Something wents to wrong call Status  Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Call Status updated successfully."));

});

const changeChatStatusAllAstrologer = asyncHandler(async (req, res) => {
    const newAstrologer = await astrologerService.updateChatStatusAllAstrologer(req.body);
    if (!newAstrologer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Something wents to wrong chat Status  Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, newAstrologer, "Chat Status  updated successfully."));

});


const changeCallStatus = asyncHandler(async (req, res) => {
    const { astrologerId, callStatus } = req.body;

    const result = await astrologerService.changeCallStatus(astrologerId, callStatus);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
})

const changeChatStatus = asyncHandler(async (req, res) => {
    const { astrologerId, chatStatus } = req.body;

    const result = await astrologerService.changeChatStatus(astrologerId, chatStatus);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
})

const changeStatus = asyncHandler(async (req, res) => {
    const { astrologerId, status } = req.body;

    const result = await astrologerService.changeStatus(astrologerId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers Blocked successfully"));
})

const deleteAstrologer = asyncHandler(async (req, res) => {
    const { astrologerId } = req.body;

    const result = await astrologerService.deleteAstrologer(astrologerId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer Not found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers deleted successfully"));
})


export {
    astrologerList, getAstrologerById, addNewAstrologer,
    changeCallStatus, changeChatStatus, changeStatus,
    updateProfile, updateGallery, updateAstrologer,
    changeCallStatusAllAstrologer,
    changeChatStatusAllAstrologer,
    deleteAstrologer
};
