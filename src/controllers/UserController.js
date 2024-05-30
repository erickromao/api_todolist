const AppError = require('../utils/AppError')

class UserController{

    create (request, response){
        const {age} = request.body
        if(isNaN(age)){
            throw new AppError('Apenas números!')
        }
        return response.send("test")
    }

}

module.exports = UserController