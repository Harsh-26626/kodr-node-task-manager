const REGEX = {
    name: /^[A-Za-z\p{L}\s'-]{2,50}$/u,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    requierments: {
        name: 'A valid name should not contain any numbers',
        email: 'A valid email address is of syntax: user@domain.tld',
        password: 'A valid password should contain atleast 1 uppercase and 1 lowercase character, 1 number, 1 special character and should be atleast 8 characters long.'
    }
}

const VerifyFields = (task) => {
    return (req, res, next) => {
        let entity;
        if(task === 'signup') {
            entity = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
        } else if(task === 'login') {
            entity = {
                email: req.body.email,
                password: req.body.password
            };
        }

        const errors = verifyUser(entity);

        if(errors.length === 0) {
            req['entity'] = entity;
            next();
        } else {
            return res.status(422).json({'Error': 'Sorry, we cannot serve your request!', 'Validation Errors': errors});
        }
    }
}

const verifyTasksFields = (req, res, next) => {
    const entity = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        userId: req.body.userId
    };

    const errors = [];
    ['title', 'description', 'userId'].forEach((key) => {
        if(!entity[key]) {
            errors.push('Cannot create/update task, ' + key + ' is missing!');
        }
    });
    if(errors.length === 0) {
        req['entity'] = entity;
        next();
    } else {
        return res.status(422).json({'Error': 'Sorry, we cannot serve your request!', 'Validation Errors': errors});
    }
}

function verifyUser(entity) {
    const errors = [];

    Object.keys(entity).forEach((key) => {
        if(!entity[key] || !REGEX[key].test(entity[key])) {
            errors.push(REGEX['requierments'][key]);
        }
    });

    return errors;
}

export { VerifyFields, verifyTasksFields };