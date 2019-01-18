exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Day to day", description: "Daily tasks", completed: false },
        {
          name: "Super Secret Plan",
          description: "Super villan style projects",
          completed: false
        }
      ]);
    });
};
