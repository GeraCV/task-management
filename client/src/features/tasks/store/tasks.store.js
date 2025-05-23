import { create } from 'zustand'

const taskStore = create((set, get) => ({
    url: import.meta.env.VITE_API_URL,
    tasks: [],
    errors: {},
    getAllTasks: async () => {
        try {
            const request = await fetch(`${get().url}/tasks`)
            const response = await request.json()

            if(request.status == 200) {
                const data = response.data
                set({ tasks: data })
            }
        } catch (error) {
            console.error(error)
        }
    },
    submitTask: async (formData, type ) => {
        try {
            const { id, ...form } = formData
            let endpoint = type == 'CREATE'
                ? `${get().url}/tasks`
                : `${get().url}/tasks/${id}`
            let method = type == 'CREATE'
                ? 'POST'
                : 'PUT'
            const request = await fetch(endpoint, {
                method: method,
                 headers: {'Content-type': 'application/json'},
                body: JSON.stringify(form)
            })
            const response = await request.json()

            if(request.status == 200) {
                await get().getAllTasks()
            } else if (request.status == 422) {
                const errors = response.errors
                set({ errors: errors })
            }
            return request.status
        } catch (error) {
            console.error(error)
        }
    },
    deleteTask: async (id) => {
        try {
            const request = await fetch(`${get().url}/tasks/${id}`, {
                method: 'DELETE'
            })
            const response = await request.json()

            if(request.status == 200) {
                set({ tasks: get().tasks.filter(tasks => tasks.id !== id) })
            }
        } catch (error) {
            console.error(error)
        }
    },
    setErrors: () => set({ errors: {} })
}))

export default taskStore