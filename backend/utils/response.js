/**
 * Standardized Response Utility
 * @param {Object} res - The Express response object
 * @param {Number} code - HTTP Status Code (e.g., 200, 400, 404, 500)
 * @param {Object} data - The payload (e.g., { message: "Success" } or { error: "Error" })
 */
module.exports.responseReturn = (res, code, data) => {
    return res.status(code).json(data);
};