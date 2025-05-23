import { create } from 'zustand'

const userStore = create((set, get) => ({
    url: import.meta.env.VITE_API_URL,
    users: [],
    errors: {},
    getAllUsers: async () => {
        try {
            const request = await fetch(`${get().url}/users`)
            const response = await request.json()

            if(request.status == 200) {
                const data = response.data
                set({ users: data })
            }
        } catch (error) {
            console.error(error)
        }
    },
    submitUser: async (formData, type ) => {
        try {
            const { id, ...form } = formData
            let endpoint = type == 'CREATE'
                ? `${get().url}/users`
                : `${get().url}/users/${id}`
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
                await get().getAllUsers()
            } else if (request.status == 422) {
                const errors = response.errors
                set({ errors: errors })
            }
            return request.status
        } catch (error) {
            console.error(error)
        }
    },
    deleteUser: async (id) => {
        try {
            const request = await fetch(`${get().url}/users/${id}`, {
                method: 'DELETE'
            })
            const response = await request.json()

            if(request.status == 200) {
                set({ users: get().users.filter(user => user.id !== id) });
            }
        } catch (error) {
            console.error(error)
        }
    },
    setErrors: () => set({ errors: {} })
}))

export default userStore