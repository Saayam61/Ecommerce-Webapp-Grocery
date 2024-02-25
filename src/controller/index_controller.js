exports.getIndex = (req, res) => {
    const tValue = "New Leaf Grocery | Home"
    return res.render('../view/main/index', {title: tValue})
}