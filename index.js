const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

/// PROJECTS ///

/// READ

server.get("/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/// BY ID

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  db("projects")
    .where({ id: id })
    .first()
    .then(projects => {
      if (projects) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            projects.actions = actions;
            res.status(200).json(projects);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
/// CREATE

server.post("/projects", (req, res) => {
  const projects = req.body;

  db("projects")
    .insert(projects)
    .into("projects")
    .then(ids => {
      res.status(201).json({ ids });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/// ACTIONS

// READ

server.get("/actions", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/// BY ID

server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where({ id: id })
    .first()
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// CREATE
server.post("/actions", (req, res) => {
  const action = req.body;
  db("actions")
    .insert(action)
    .into("actions")
    .then(ids => {
      res.status(201).json({ ids });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(3333, () => console.log("\nWorking!!\n"));
