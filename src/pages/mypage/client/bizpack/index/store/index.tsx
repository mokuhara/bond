export const bizpacksState = [
    {
        id: 0,
        category: 1,
        products: [{ name: "" }],
        industry: "",
        scale: 0,
        title: "",
        description: "",
        unitPrice: 0,
        duration: 0,
        isPublic: false,
        userId: 0
    }
]


export const resbizpacksState = [
    {
        ID: 0,
        category: {type: 0},
        products: [{ name: "" }],
        industry: "",
        scale: 0,
        title: "",
        description: "",
        unitPrice: 0,
        duration: 0,
        isPublic: false,
        userId: 0
    }
]

export const transactionState = [{
    ID: 0,
    bizpackId: 0,
    Bizpack: {
        products: [{name: ""}],
        category: { type: 1 },
        title: "",
        userId: 0,
        industry: "",
        scale: 0,
        description: "",
        unitPrice: 0,
        duration: 0,
        isPublic: false
    },
    status: 1,
    videoMeetings: [{
        id: 0,
        topic: "",
        join_url: "",
        start_time: ""
    }],
    payments: [{
        id: 0,
        transactionId: 0,
        isPaid: false
    }],
    reviews: [{
        transactionId: 0,
        userId: 0,
        message: "",
        rating: 0
    }]
}]
