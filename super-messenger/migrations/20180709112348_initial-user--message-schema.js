
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').unique(); //this is the equivalent of creating a serial column, it important to add unique though so it can't be changd to the same value later. 
        table.string('first_name');
        table.string('last_name');
        table.string('email'); //this is the users signup email 
        table.string('username');
        table.specificType('hashed_password', 'char(60)').notNullable(); //this is the users uniquely encripted password
    })
    .then( () => {
        return knex.schema.createTable('user_settings', (table) => {
            table.integer('user_id').references('user_id').inTable('users'); //this is the equivalent of creating a serial column
            table.binary('monthly_newsletter'); 
        })
    })
    .then( () => {
        return knex.schema.createTable('user_profile', (table) => {
            table.integer('user_id').references('user_id').inTable('users');
            table.string('about'); 
        })
    })
    .then( () => {
        return knex.schema.createTable('message_content_from', (table) => {
            table.increments('message_id').unique();
            table.integer('from').references('user_id').inTable('users');
            table.string('message_content');  

        })
    })
    .then( () => {
        return knex.schema.createTable('message_to', (table)=> {
            table.integer('message_id').references('message_id').inTable('message_content_from');
            table.integer('to').references('user_id').inTable('users');
        })
    }) 
    .then( () => {
        return knex.schema.createTable('message_cc', (table)=> {
            table.integer('message_id').references('message_id').inTable('message_content_from');
            table.integer('cc').references('user_id').inTable('users');
        })
    }) 
    .then( () => {
        return knex.schema.createTable('message_bcc', (table)=> {
            table.integer('message_id').references('message_id').inTable('message_content_from');
            table.integer('bcc').references('user_id').inTable('users');
        })
    })
}

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('message_bcc')
    .then( ()=>{
        return knex.schema.dropTable('message_cc')
    })
    .then( ()=>{
        return knex.schema.dropTable('message_to')
    })
    .then( ()=>{
        return knex.schema.dropTable('message_users')
    })
    .then( ()=>{
        return knex.schema.dropTable('user_profile')
    })
    .then( ()=>{
        return knex.schema.dropTable('user_settings')
    })
    .then( ()=>{
        return knex.schema.dropTable('users')
    })
};


