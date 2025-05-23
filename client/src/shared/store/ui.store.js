import { create } from "zustand";

const uiStore = create((set) => ({
    isOpenModal: false,
    modalData: null,

    isOpenDeleteModal: false,
    deleteModalData: null,
    typeDeleteModal: null,

    openModal: (status, data = null) =>
        set({ isOpenModal: status, modalData : data }),

    closeModal: () =>
        set({ modal: null, modalData: null }),

    openDeleteModal: (status, data, type) =>
        set({
            isOpenDeleteModal: status,
            deleteModalData : data,
            typeDeleteModal: type
        }),

    closeDeleteModal: () => set({
        isOpenDeleteModal: false,
        modalData: null,
        typeDeleteModal: null
    })
}))

export default uiStore