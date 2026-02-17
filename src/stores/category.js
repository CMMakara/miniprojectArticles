import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const useCategoryStore = defineStore('category', () => {
    //state management
    let categories = ref([]);
    let pagination = reactive({
        "currentPage": 0,
        "itemPerPage": 0,
        "totalItems": 0,
        "totalPages": 0,
        "hasPreviousPage": true,
        "hasNextPage": true
    })
    //action
    async function fecthCategory(page = 1, perPage = 100) {
        try {
            const res = await api.get('/categories', {
                params: {
                    _page: page,
                    _per_page: perPage,
                    sortBy: 'createdAt'
                }
            })

            categories.value = res.data?.data?.items ?? []
            Object.assign(pagination, res.data?.data?.meta ?? {})
        } catch (error) {
            console.error('Fetch category error:', error)
        }
    }

    //return
    return { categories, fecthCategory, pagination }
})