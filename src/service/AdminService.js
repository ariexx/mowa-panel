export const AdminService = {
    async getStatisticsData() {
        try {
            const response = await fetch('https://f4db56d0-a569-414e-b0e5-19a31b12e53b.mock.pstmn.io/api/v1/admin/dashboard-statistic');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    },

    async getLastOrders({ limit }) {
        try {
            const response = await fetch('https://f4db56d0-a569-414e-b0e5-19a31b12e53b.mock.pstmn.io/api/v1/admin/last-orders?limit=' + limit);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
};
