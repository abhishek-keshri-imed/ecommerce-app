import ProtectedRoute from "./ProtectedRoute";
import { adminRoutes } from "./adminRoutes";
import { customerRoutes } from "./CustomerRoute";
import { sellerRoutes } from "./SellerRoute";
import PrivateRoute from "./PrivateRoute";

// Step 1: Combine all private route arrays
const allProtectedRoutes = [
    ...adminRoutes,
    ...customerRoutes,
    ...sellerRoutes,
    ...PrivateRoute,
];

// Step 2: Map and Wrap (Done ONCE at the module level)
const finalRoutes = allProtectedRoutes.map((r) => {
    return {
        ...r,
        element: <ProtectedRoute route={r}>{r.element}</ProtectedRoute>,
    };
});

/**
 * Returns the stable, memoized routing table.
 */
export const getRoutes = () => {
    return finalRoutes;
};