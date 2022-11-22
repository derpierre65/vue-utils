function generateRandomId() {
    return (Math.random()).toString(36).substring(4);
}

export {
    generateRandomId,
}