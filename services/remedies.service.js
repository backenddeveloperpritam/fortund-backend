import ApiError from "../utils/ApiError.js";
import Remedies from "../models/adminModel/Remedies.js";

// Get all remedies
const getRemedies = async () => {
    const remedies = await Remedies.find({});
    return remedies;
};

// Get a single remedy by ID
const getRemediesById = async (id) => {
    const remedies = await Remedies.findById(id);
    if (!remedies) {
        throw new ApiError(404, "Remedy not found");
    }
    return remedies;
}

// Add new remedies
const addNewRemedies = async (body) => {
    const { title, description, status } = body;

    const existsRemedies = await Remedies.findOne({ title: new RegExp(`^${title}$`, 'i') });
    if (existsRemedies) {
        throw new ApiError(400, "Remedy already exists");
    }

    // Create new remedy
    const remedies = await Remedies.create({ title, description, status });
    return remedies;
};

// Update an existing remedy
const updateRemedies = async (remediesId, updateData) => {
    const remedies = await Remedies.findByIdAndUpdate(remediesId, updateData, { new: true });
    if (!remedies) {
        throw new ApiError(404, "Remedy not found");
    }
    return remedies;
}

// Change the status of a remedy
const changeStatus = async (remediesId, status) => {
    const remedies = await Remedies.findByIdAndUpdate(
        remediesId,
        { status },
        { new: true }
    );
    if (!remedies) {
        throw new ApiError(404, "Remedy not found");
    }
    return remedies;
};

// Soft delete a remedy
const deleteRemedies = async (remediesId) => {
    const updatedRemedies = await Remedies.findByIdAndUpdate(
        remediesId,
        { isDeleted: true },
        { new: true }
    );
    if (!updatedRemedies) {
        throw new ApiError(404, "Remedy not found");
    }
    return updatedRemedies;
};

export { getRemedies, getRemediesById, addNewRemedies, updateRemedies, changeStatus, deleteRemedies };
