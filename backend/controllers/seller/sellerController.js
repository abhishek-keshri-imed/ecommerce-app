const userModel = require('../../models/userModel');
const { responseReturn } = require('../../utils/response'); // 🛠️ Fixed path: 3 levels up, plural 'utils'

class sellerController {
    
    // --- FETCH PROFILE ---
    get_seller_profile = async (req, res) => {
        const { id } = req; 

        try {
            const seller = await userModel.findById(id);
            if (!seller) {
                return responseReturn(res, 404, { error: "Seller profile not found" });
            }
            console.log("Fetched Seller Profile:", {
                id: seller._id,
                shopName: seller.shopInfo?.shopName,    
            });
            return responseReturn(res, 200, { seller });
        } catch (error) {
            console.error("Get Seller Profile Error:", error.message);
            return responseReturn(res, 500, { error: error.message });
        }
    };

    // --- UPDATE PROFILE ---
    update_seller_profile = async (req, res) => {
        const { id } = req;
        const { shopName, phoneNumber, shopDescription, street, city, state, zipCode } = req.body;

        try {
            const seller = await userModel.findById(id);
            if (!seller) {
                return responseReturn(res, 404, { error: "Seller profile not found" });
            }

            if (!seller.shopInfo) seller.shopInfo = { businessAddress: {} };
            if (!seller.shopInfo.businessAddress) seller.shopInfo.businessAddress = {};

            seller.shopInfo.shopName = shopName || seller.shopInfo.shopName;
            seller.shopInfo.phoneNumber = phoneNumber || seller.shopInfo.phoneNumber;
            seller.shopInfo.shopDescription = shopDescription || seller.shopInfo.shopDescription;
            
            seller.shopInfo.businessAddress.street = street || seller.shopInfo.businessAddress.street;
            seller.shopInfo.businessAddress.city = city || seller.shopInfo.businessAddress.city;
            seller.shopInfo.businessAddress.state = state || seller.shopInfo.businessAddress.state;
            seller.shopInfo.businessAddress.zipCode = zipCode || seller.shopInfo.businessAddress.zipCode;

            await seller.save();

            return responseReturn(res, 200, { 
                seller, 
                message: "Your shop profile has been updated successfully!" 
            });
        } catch (error) {
            console.error("Update Seller Profile Error:", error.message);
            return responseReturn(res, 500, { error: error.message });
        }
    };
}

module.exports = new sellerController();