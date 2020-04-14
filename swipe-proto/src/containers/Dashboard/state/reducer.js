const initState = {
    categories: [
        { id: 0, name: "Hello darkness my old friend" },
        { id: 1, name: "two" },
        { id: 2, name: "three" },
        { id: 3, name: "four" },
        { id: 4, name: "five" },
        { id: 5, name: "six" }
    ]
}

const DashboardReducer = (state = initState, action) => {
    return state;
}

export default DashboardReducer;