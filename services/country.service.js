import Country from "../models/adminModel/Country.js";
import ApiError from "../utils/ApiError.js";
import State from "../models/adminModel/State.js";

const getCountry = async () => {
    const countries = await Country.aggregate([
        {
            $lookup: {
                from: 'states',
                let: { country: '$_id' },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ['$countryId', '$$country'] }, { $eq: ['$isDeleted', false] }] } } }
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


const getStateByCountry = async (body) => {
    const { countryId } = body;
    const country = State.find({ countryId: countryId });
    return country;
}

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

const changeStatus = async (countryId, status) => {
    const result = await Country.findByIdAndUpdate(
        countryId,
        { status },
        { new: true }
    );

    return result;
};

export { getCountry, getCountryById, addNewCountry, updateCountry, deleteCountry, changeStatus, getStateByCountry };
