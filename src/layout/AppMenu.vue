<script setup>
import { computed } from 'vue';
import { useUserRole } from '../composables/useUserRole';
import AppMenuItem from './AppMenuItem.vue';

const { userRole } = useUserRole();

const model = computed(() => {
    if (userRole.value === 'administrator') {
        return [
            {
                label: 'Admin Dashboard',
                items: [{ label: 'Admin Panel', icon: 'pi pi-fw pi-cog', to: '/admin' }],
            },
            // other admin-specific items
        ];
    } else if (userRole.value === 'member') {
        return [
            {
                label: 'Member Dashboard',
                items: [{ label: 'Profile', icon: 'pi pi-fw pi-user', to: '/profile' }],
            },
            // other member-specific items
        ];
    } else {
        return [];
    }
});
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
