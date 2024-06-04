import ApiError from "../utils/ApiError.js";
import City from "../models/adminModel/City.js";

const getCity = async () => {
    const result = await City.find({});
    return result;
};

const getCityById = async (id) => {
    const result = City.findById(id);
    return result;
}

const addNewCity = async (title, stateId, status) => {
    const existCity = await City.findOne({ title: new RegExp('^' + title + '$', 'i') });

    if (existCity) {
        throw new ApiError(400, "City already exist");
    }

    const result = await City.create({
        title,
        stateId,
        status
    });

    return result;
}

const updateCity = async (cityId, updateData) => {
    const existingCity = await City.findOne({
        _id: { $ne: cityId },
        title: updateData.title,
    });

    if (existingCity) {
        throw new Error('Another city with the same data already exists.');
    }


    const result = await City.findByIdAndUpdate(cityId, updateData, { new: true });
    return result;
}


const deleteCity = async (cityId) => {
    const result = await City.findByIdAndUpdate(
        cityId,
        { isDeleted: 1 },
        { new: true }
    );

    return result;
};

const changeStatus = async (cityId, status) => {
    const result = await City.findByIdAndUpdate(
        cityId,
        { status },
        { new: true }
    );

    return result;
};
export { getCity, getCityById, addNewCity, updateCity, deleteCity,changeStatus };
