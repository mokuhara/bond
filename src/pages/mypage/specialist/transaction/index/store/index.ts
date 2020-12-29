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
    Payments: [{
        id: 0,
        transactionId: 0,
        isPaid: false
    }],
    Reviews: [{
        transactionId: 0,
        userId: 0,
        message: "",
        rating: 0
    }]
}]

export const summrizedTransactionState = {
    id: 0,
    category: "",
    title: "",
    status: "",
    description: "",
    transaction: transactionState[0]
}


export const statusState = [
    {id: 1, name: "面談前"},
    {id: 2, name: "承認前"},
    {id: 3, name: "見積書送付前"},
    {id: 4, name: "申込書送付前"},
    {id: 5, name: "契約中(申込完了)"},
    {id: 6, name: "契約終了"},
    {id: 7, name: "失注"},
]

export const categoryState = [
    {id: 0, name: "選択"},
    {id: 1, name: "構築"},
    {id: 2, name: "運用"},
]