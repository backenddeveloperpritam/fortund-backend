import ApiError from "../utils/ApiError.js";
import Remedies from "../models/adminModel/Remedies.js";

const getRemedies = async () => {

    const remedies = await Remedies.find({});
    return remedies;
};

const getRemediesById = async (id) => {
    const remedies = await Remedies.findOne({ _id: id });
    if (!remedies) {
        return null;
    }
    return remedies;
}

const addNewRemedies = async (body) => {
    const { title, status } = body;

    const existsRemedies = await Remedies.findOne({ title: new RegExp('^' + title + '$', 'i') });
    console.log(existsRemedies);
    if (existsRemedies) {
        console.log("test");
        throw new ApiError(400, "Remedies already exists");
    }

    // Create new Remedies
    const remedies = await Remedies.create({ title, status });
    return remedies;
};


const updateRemedies = async (RemediesId, updateData) => {
    const remedies = await Remedies.findByIdAndUpdate(RemediesId, updateData, { new: true });
    return remedies;
}



const changeStatus = async (remediesId, status) => {
    const remedies = await Remedies.findByIdAndUpdate(
        remediesId,
        { status },
        { new: true }
    );

    return remedies;
};

const deleteRemedies = async (remediesId) => {
    const updatedRemedies = await Remedies.findByIdAndUpdate(
        remediesId,
        { isDeleted: 1 },
        { new: true }
    );

    return updatedRemedies;
};




export { getRemedies, getRemediesById, addNewRemedies, updateRemedies, changeStatus, deleteRemedies };
