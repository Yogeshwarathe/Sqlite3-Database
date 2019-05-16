const sqlite3  = require('sqlite3');

let db = new sqlite3.Database('Data', (err) => {
    if (!err){
        db.run('create table if not exists coursesTable (id integer primary key autoincrement, name text, description text)', (err, data) => {
            console.log('database created')
        })

        db.run('create table if not exists exerciseTable (id integer primary key autoincrement, name text, description text, courses_id integer)', (err, data) => {
            console.log('exercise create');
        
        })
    }
})

