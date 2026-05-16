const userModel = require('../../models/userModel');
const { responseReturn } = require('../../utils/response');

class sellerController {

    // --- FETCH PENDING SELLERS LIST ---
    request_get_seller = async (req, res) => {
        // Provide defaults to prevent NaN issues
        const page = parseInt(req.query.page) || 1;
        const parPage = parseInt(req.query.parPage) || 5;
        const searchValue = req.query.searchValue || "";
        
        const skipPage = parPage * (page - 1);

        try {
            let query = { 
                status: 'pending', 
                role: 'seller' 
            };

            if (searchValue) {
                query.$or = [
                    { name: { $regex: searchValue, $options: 'i' } },
                    { email: { $regex: searchValue, $options: 'i' } }
                ];
            }

            // Execute count and find in parallel for better performance
            const [sellers, totalSeller] = await Promise.all([
                userModel.find(query)
                    .skip(skipPage)
                    .limit(parPage)
                    .sort({ createdAt: -1 }),
                userModel.countDocuments(query)
            ]);

            responseReturn(res, 200, { sellers, totalSeller });
        } catch (error) {
            console.error("Error in request_get_seller:", error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Fetch a single seller's details
    get_seller = async (req, res) => {
        const { sellerId } = req.params;
        try {
            const seller = await userModel.findById(sellerId);
            if (!seller) {
                return responseReturn(res, 404, { error: 'Seller not found' });
            }
            responseReturn(res, 200, { seller });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Update status (Approve/Reject)
    seller_status_update = async (req, res) => {
        const { sellerId, status } = req.body;

        // Validation: Ensure status is valid
        const validStatuses = ['active', 'deactive', 'pending'];
        if (!validStatuses.includes(status)) {
            return responseReturn(res, 400, { error: 'Invalid status update' });
        }

        try {
            // { new: true } returns the updated document directly
            const seller = await userModel.findByIdAndUpdate(
                sellerId, 
                { status }, 
                { new: true } 
            );

            if (!seller) {
                return responseReturn(res, 404, { error: 'Seller not found' });
            }

            responseReturn(res, 200, { 
                seller, 
                message: `Seller status updated to ${status} successfully` 
            });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }
}

module.exports = new sellerController();