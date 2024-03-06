const catchError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((err) => {
                console.error(err); // Log the error for debugging purposes
                res.status(500).send('Internal Server Error');
            });
    };
};

module.exports = catchError;
