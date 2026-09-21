const allowedOrigins = ['localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    optionsSuccessStatus:true
};

export default corsOptions;