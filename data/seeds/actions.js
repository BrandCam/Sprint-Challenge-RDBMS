exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Do dishes",
          notes: "They are quite dirty",
          completed: false,
          project_id: 1
        },
        {
          description: "Make food",
          notes: "I am starving",
          completed: false,
          project_id: 1
        },
        {
          description: "Find a wife",
          notes: "Never again",
          completed: false,
          project_id: 2
        },
        {
          description: "Manual labor",
          notes: "Lol aint doing that again",
          completed: false,
          project_id: 2
        }
      ]);
    });
};
