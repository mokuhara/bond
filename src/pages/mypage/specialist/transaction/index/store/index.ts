export const transactionState = [{
    id: 0,
    bizpackId: 0,
    bizpack: {
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

export const summrizedTransactionState = {
    id: 0,
    category: 0,
    title: "",
    status: 0,
    description: "",
    transaction: transactionState[0]
}