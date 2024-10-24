<script setup>
import { onMounted, ref } from 'vue';
import { AdminService } from '@/service/AdminService';
import ProgressSpinner from 'primevue/progressspinner';

const statisticsData = ref(null);
const loading = ref(true);
const tableLoading = ref(false);
const orders = ref([]);

async function fetchStatisticsData() {
    try {
        const data = await AdminService.getStatisticsData().then(res => res.data);
        statisticsData.value = data;
    } catch (error) {
        console.error('Failed to fetch statistics data:', error);
    }
}

async function fetchLastOrders({ limit = 5 } = { limit: 5 }) {
    tableLoading.value = true;
    try {
        const data = await AdminService.getLastOrders({ limit: limit }).then(res => res.data);
        orders.value = data;
    } catch (error) {
        console.error('Failed to fetch last orders:', error);
    } finally {
        tableLoading.value = false;
    }
}

const getSeverity = (status) => {
    status = status.toLowerCase();
    switch (status) {
        case 'cancel':
            return 'danger';
        case 'completed':
            return 'success';
        case 'in progress':
            return 'info';
        case 'partials':
        case 'pending':
            return 'warn';
    }
};

onMounted(async () => {
    loading.value = true;
    await fetchStatisticsData();
    await fetchLastOrders();
    loading.value = false;
});
</script>

<template>
    <div v-if="loading" class="loading-screen">
        <ProgressSpinner />
    </div>
    <div v-else class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 border border-surface">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Users</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ statisticsData.total_users }}
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
                         style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 border border-surface">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Orders</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ statisticsData.total_orders }}
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
                         style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 border border-surface">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Revenue</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ statisticsData.total_revenue }}
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border"
                         style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-green-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 border border-surface">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Tickets Open</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ statisticsData.total_ticket_open }}
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border"
                         style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-ticket text-red-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-8">
            <Card>
                <template #title>
                    <h3 class="text-xl font-bold">Last 5 Transaction</h3>
                    <Divider/>
                </template>
                <template #content>
                    <div class="table-loading-overlay" v-if="tableLoading">
                        <ProgressSpinner />
                    </div>
                    <DataTable :value="orders" :loading="tableLoading">
                        <Column field="name" header="Name" sortable />
                        <Column field="product" header="Product" sortable />
                        <Column field="total" header="Total" sortable />
                        <Column field="price" header="Price" sortable />
                        <Column field="status" header="Status">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                            </template>
                        </Column>
                        <Column field="date" header="Date" sortable />
                    </DataTable>
                </template>
            </Card>
        </div>
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <Card>
                <template #title>
                    <h3 class="text-xl font-bold">Deposit</h3>
                    <Divider/>
                    <span class="text-bold text-muted-color">Total</span>
                    <h4 class="text-2xl font-bold">Rp. 1.500.000</h4>
                    <Divider/>
                </template>
                <template #content>
                    <div class="flex items center justify-between">
                        <p class="m-0">
                            1 Bulan Lalu : <span class="font-bold">Rp. 1.000.000</span>
                        </p>
                        <Divider layout="vertical"/>
                        <p class="m-0">
                            2 Bulan Lalu : <span class="font-bold">Rp. 500.000</span>
                        </p>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
.loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: #333;
}

.table-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
}
</style>
