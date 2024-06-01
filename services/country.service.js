import Country from "../models/adminModel/Country.js";
import ApiError from "../utils/ApiError.js";

const getCountry = async () => {
    const countries = await Country.aggregate([
        {

            $lookup: {
                from: 'State',
                let: { country: '$_id' },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ['$country', '$$country'] }, { $eq: ['$isDeleted', false] }] } } }
                ],
                as: 'states'
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                code: 1,
                status: 1,
                stateCount: { $size: '$states' }
            }
        }
    ]);
    return countries;
};

const getCountryById = async (id) => {
    const country = Country.findOne({ _id: id });
    return country;
}

const addNewCountry = async (title, code, status) => {

    const existCountry = await Country.findOne({ title: new RegExp('^' + title + '$', 'i') });

    if (existCountry) {
        throw new ApiError(400, "Country already exist");
    }

    const country = await Country.create({
        title,
        code,
        status
    });

    return country;
}

const updateCountry = async (countryId, updateData) => {
    const country = await Country.findByIdAndUpdate(countryId, updateData, { new: true });
    return country;
}

const deleteCountry = async (countryId) => {
    const country = await Country.findByIdAndUpdate(
        countryId,
        { isDeleted: 1 },
        { new: true }
    );

    return country;
};

export { getCountry, getCountryById, addNewCountry, updateCountry, deleteCountry };