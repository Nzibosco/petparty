// var db = require("../models");

// module.exports = function(app) {
//   //GET route for getting all events
//   app.get("/api/events", function(req, res) {
//     var query = {};
//     if (req.query.user_id) {
//       query.UserId = req.query.user_id;
//     }
//     db.Events.findAll({
//       where: query,
//       include: [db.Users]
//     }).then(function(Events) {
//       res.json(Events);
//     });
//   });

//   //POST route for saving new events
//   app.post("/api/events", function(req, res) {
//     db.Events.create(req.body).then(function(events) {
//       res.json(events);
//     });
//   });

//   //DELETE route for deleting events

//   app.delete("/api/events/:id", function(req, res) {
//     db.Events.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(events) {
//       res.json(events);
//     });
//   });

//   //PUT route for updating events
//   //?? should it stay req.body ?
//   app.put("/api/events", function(req, res) {
//     db.Events.update(req.body, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(events) {
//       res.json(events);
//     });
//   });
// };
