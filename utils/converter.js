import mongoose from "mongoose";

/**
 * Converts a string ID to a MongoDB ObjectId.
 * @param {string} id - The string ID to convert.
 * @returns {mongoose.Types.ObjectId} - The converted ObjectId.
 * @throws {Error} - Throws an error if the ID is invalid.
 */
export function convertToObjectId(id) {
    console.log(id);
    console.log(mongoose.Types.ObjectId.isValid(id));

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
    }
    return new mongoose.Types.ObjectId(id);
}

