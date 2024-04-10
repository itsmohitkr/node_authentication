
const service = require("./signup.service")

async function create(req, res) {
console.log("signup data: ",req.body.data);
   const userData = await service.create(req.body.data);
   res.status(201).json({ data: userData });
 }

module.exports = {
    create,
}