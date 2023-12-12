exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.integer('age').unsigned().notNullable();
      table.string('phone').notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
