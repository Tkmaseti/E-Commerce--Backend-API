const { authJwt } = require("../middleware"); 
const controller = require("../controllers/gift.controllers");
const { isModerator } = require("../middleware/authJwt");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/gift", controller.findAll);
    app.post("/api/gift", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    app.get("/api/gift", [authJwt.verifyToken], controller.findOne);
    app.delete("/api/gift", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAll);
    app.delete("/api/gift/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteOne);
    app.put("/api/gift/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

};