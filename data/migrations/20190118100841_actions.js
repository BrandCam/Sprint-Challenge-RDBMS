exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments();
    tbl.string("description", 250).notNullable();
    tbl.text("notes", 550).notNullable();
    tbl.boolean("completed").defaultTo(false);
    tbl.integer("project_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
