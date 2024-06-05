import ApiError from "../utils/ApiError.js";
import Astrologer from "../models/adminModel/Astrologer.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"

const getAstrologer = async (title) => {
    const titleMatch = { "displayName": { "$regex": title, "$options": "i" } };

    const astrologers = await Astrologer.find({
        ...titleMatch,
    });

    return astrologers;

};

const getAstrologerById = async (id) => {
    const astrologer = await Astrologer.findOne({ _id: id });
    if (!astrologer) {
        return null;
    }
    return astrologer;

}

const addNewAstrologer = async (body, files) => {
    const {
        displayName,
        name,
        email,
        password,
        phoneCode,
        phoneNumber,
        gender,
        dateOfBirth,
        experience,
        language,
        address,
        currencyType,
        currencyValue,
        country,
        state,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        bankProofImage,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accouuntHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        skill,
        expertise,
        remedies,
        astrologerType,
        status,
    } = body;

    const existingAstrologer = await Astrologer.findOne({ $or: [{ phoneNumber }, { email }] });
    if (existingAstrologer) {
        throw new Error("Astrologer with this phone number or email already exists.");
    }

    const skillArray = Array.isArray(skill) ? skill : [];
    const remediesArray = Array.isArray(remedies) ? remedies : [];
    const expertiseArray = Array.isArray(expertise) ? expertise : [];

    // File upload handling
    const profileImagePath = files.profileImage ? files.profileImage[0].path : "";
    const idProofImagePath = files.idProofImage ? files.idProofImage[0].path : "";
    const galleryImages = files.galleryImage ? files.galleryImage.map(file => file.path) : [];
    // console.log(galleryImages);

    // Handle other file uploads similarly...
    const profileImage = await uploadOnCloudinary(profileImagePath);
    const idProofImage = await uploadOnCloudinary(idProofImagePath);
    const galleryImageUrls = await Promise.all(galleryImages.map(uploadOnCloudinary));
    const galleryImg = galleryImageUrls.map((img) => img.url);
    if (!profileImage) {
        throw new ApiError(400, "profileImage file is required")
    }
    if (!idProofImage) {
        throw new ApiError(400, "idProofImage file is required")
    }

    // Check if the astrologer already exists

    // Create a new astrologer entry
    const newAstrologer = new Astrologer({
        displayName,
        name,
        email,
        password,
        phoneCode,
        phoneNumber,
        gender,
        dateOfBirth,
        experience,
        language,
        address,
        currencyType,
        currencyValue,
        country,
        state,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        profileImage: profileImage.url,
        idProofImage: idProofImage.url,
        galleryImage: galleryImg,
        bankProofImage,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accouuntHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        skill: skillArray,
        expertise: expertiseArray,
        remedies: remediesArray,
        astrologerType,
        status,
    });

    const astrologer = await newAstrologer.save();

    const createdUser = await Astrologer.findById(astrologer._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return createdUser;
};

const updateProfileImage = async (body, file) => {
    const { astrologerId } = body;
    const profileImagePath = file.path ? file.path : "";
    const profileImage = await uploadOnCloudinary(profileImagePath);
    if (!profileImage) {
        throw new ApiError(400, "profileImage file is required")
    }

    const oldAstrologer = await Astrologer.findById(astrologerId);
    const oldProfileImageURL = oldAstrologer.profileImage;
    if (oldProfileImageURL) {
        await deleteFromCloudinary(oldProfileImageURL);
    }

    const updatedAstrologer = await Astrologer.findOneAndUpdate(
        { _id: astrologerId },
        { profileImage: profileImage.url },
        { new: true }
    );

    return updatedAstrologer;
}

const updateProfileGalleryImage = async (body, files) => {
    const { astrologerId } = body;
    const galleryImages = files.galleryImages ? files.galleryImages.map(file => file.path) : [];

    const galleryImageUrls = await Promise.all(galleryImages.map(uploadOnCloudinary));
    const galleryImg = galleryImageUrls.map((img) => img.url);

    const oldAstrologer = await Astrologer.findById(astrologerId);
    if (oldAstrologer.galleryImage && oldAstrologer.galleryImage.length > 0) {
        await Promise.all(oldAstrologer.galleryImage.map(deleteFromCloudinary));
    }

    const updatedAstrologer = await Astrologer.findOneAndUpdate(
        { _id: astrologerId },
        { galleryImage: galleryImg },
        { new: true }
    );

    return updatedAstrologer;
}

const updateCallStatusAllAstrologer = async (body) => {
    const { callStatus } = body;
    const result = await Astrologer.updateMany({}, { callStatus: callStatus });
    return result;
}

const updateChatStatusAllAstrologer = async (body) => {
    const { chatStatus } = body;
    const result = await Astrologer.updateMany({}, { chatStatus: chatStatus });
    return result;
}

const updateAstrologer = async (body) => {
    const {
        astrologerId,
        displayName,
        name,
        email,
        phoneCode,
        phoneNumber,
        gender,
        dateOfBirth,
        experience,
        language,
        address,
        currencyType,
        currencyValue,
        country,
        state,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accouuntHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        skill,
        expertise,
        remedies,
        astrologerType,
        status,
    } = body;

    // Find the existing astrologer by ID
    let astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        throw new ApiError(404, "Astrologer not found");
    }
    const skillArray = Array.isArray(skill) ? skill : [];
    const remediesArray = Array.isArray(remedies) ? remedies : [];
    const expertiseArray = Array.isArray(expertise) ? expertise : [];

    // Update astrologer fields
    astrologer.displayName = displayName;
    astrologer.name = name;
    astrologer.email = email;
    astrologer.phoneCode = phoneCode;
    astrologer.phoneNumber = phoneNumber;
    astrologer.gender = gender;
    astrologer.dateOfBirth = dateOfBirth;
    astrologer.experience = experience;
    astrologer.language = language;
    astrologer.address = address;
    astrologer.currencyType = currencyType;
    astrologer.currencyValue = currencyValue;
    astrologer.country = country;
    astrologer.state = state;
    astrologer.city = city;
    astrologer.zipCode = zipCode;
    astrologer.about = about;
    astrologer.educationQualification = educationQualification;
    astrologer.astrologyQualification = astrologyQualification;
    astrologer.follower_count = follower_count;
    astrologer.rating = rating;
    astrologer.bankAcountNumber = bankAcountNumber;
    astrologer.bankName = bankName;
    astrologer.accountType = accountType;
    astrologer.ifscCode = ifscCode;
    astrologer.accouuntHolderName = accouuntHolderName;
    astrologer.addharNumber = addharNumber;
    astrologer.panNumber = panNumber;
    astrologer.chatPrice = chatPrice;
    astrologer.companyChatPrice = companyChatPrice;
    astrologer.callPrice = callPrice;
    astrologer.companyCallPrice = companyCallPrice;
    astrologer.liveVideoPrice = liveVideoPrice;
    astrologer.companyLiveVideoPrice = companyLiveVideoPrice;
    astrologer.liveCallPrice = liveCallPrice;
    astrologer.companyLiveCallPrice = companyLiveCallPrice;
    astrologer.skill = skillArray;
    astrologer.expertise = expertiseArray;
    astrologer.remedies = remediesArray;
    astrologer.astrologerType = astrologerType;
    astrologer.status = status;

    // Save the updated astrologer
    const updatedAstrologer = await astrologer.save();

    return updatedAstrologer;
}

const changeCallStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.callStatus = status;

    await astrologer.save();

    return astrologer;
};

const changeChatStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.chatStatus = status;

    await astrologer.save();

    return astrologer;
};

const changeStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.status = status;

    await astrologer.save();

    return astrologer;
};

const deleteAstrologer = async (astrologerId) => {
    const result = await Astrologer.findByIdAndUpdate(
        astrologerId,
        { isDeleted: 1 },
        { new: true }
    );

    return result;
};


export {
    getAstrologer, getAstrologerById, addNewAstrologer,
    changeCallStatus, changeChatStatus, changeStatus,
    updateAstrologer, updateProfileImage, updateProfileGalleryImage,
    deleteAstrologer,
    updateCallStatusAllAstrologer,
    updateChatStatusAllAstrologer
};
