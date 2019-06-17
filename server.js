const express = require('express');
const sqlite3 = require('sqlite3');
const database = require('./sql_use');
const app = express();

app.use(express.json());

app.get('/courses', (req, res) => {
    let db1 = new sqlite3.Database('Data', (err) => {
        if (err){
            console.log(err);
        } else {
            db1.all('select * from coursesTable;', (err, data) => {
                if (data){
                    res.send(data);
                }else {
                    console.log(err);
                }
            })
        }
    })
})


app.get('/courses/:id', (req, res) => {
    var new_id = req.params.id
    let db1 = new sqlite3.Database('Data', (err) => {
        if (err){
            console.log(err);
        } else {
            db1.all('select * from coursesTable;', (err, data) => {
                if (data){
                    for(var i=0; i<data.length; i++){
                        if(data[i]['id'] == new_id){
                            res.send(data[i]);
                        }
                    }
                }else {
                    console.log(err);
                }
            })
        }
    })
})


app.get('/exercise', (req, res) => {
    let db1 = new sqlite3.Database('Data', (err) => {
        if (err){
            console.log(err);
        } else {
            db1.all('select * from exerciseTable', (err, data) => {
                if (data){
                    res.send(data);
                }else {
                    console.log(err);
                }
            })
        }
    })
})

app.get('/coursesExercise/:id', (req, res) => {
    var new_id = req.params.id
    let db1 = new sqlite3.Database('Data', (err) => {
        if (err){
            console.log(err);
        } else {
            db1.all('select * from exerciseTable;', (err, data) => {
                if (data){
                    var dict_list = [];
                    for(var i=0; i<data.length; i++){
                        if(data[i]['courses_id'] == new_id){
                            // console.log(data[i]);
                            dict_list.push(data[i])
                        }
                    }
                    // console.log(dict_list);
                    res.send(dict_list);
                }else {
                    console.log(err);
                }
            })
        }
    })
})



app.post('/courses', (req, res) => {
    let name = req.body.name;
    let description  = req.body.description;

    let db1 = new sqlite3.Database('Data', (err) => {
        if (!err){
            db1.run('insert into coursesTable (name, description) values (" '+name+' ", " '+description+' ")');
            console.log('data inserted successfully');
            res.send('success');
        }
    })
})

app.post('/exercise/:id', (req, res) => {
    let name = req.body.name;
    let description  = req.body.description;
    let id = req.params.id;

    let db1 = new sqlite3.Database('Data', (err) => {
        if (!err){
            db1.run('insert into exerciseTable (name, description, courses_id) values (" '+name+' ", " '+description+' ", " '+id+' ")');
            console.log('data inserted successfully');
            res.send('success exersic');
        }
    })
})



app.put('/courses/:id', (req,res)=> {
    var new_dict = req.body.name;
    var description = req.body.description;
    var user_id = req.params.id
    let db1 = new sqlite3.Database('Data', (err) => {
        if (!err) {
            db1.run('update coursesTable set name="'+new_dict+'",description="'+description+'" where id="'+user_id+'";')
            console.log('this is update');
            res.send('update sacsesfull');
        }
    })
})


app.put('/exercise/:id', (req,res)=> {
    var new_dict = req.body.name;
    var description = req.body.description;
    var user_id = req.params.id
    let db1 = new sqlite3.Database('Data', (err) => {
        if (!err) {
            db1.run('update exerciseTable set name="'+new_dict+'",description="'+description+'" where id="'+user_id+'";')
            console.log('this is update');
            res.send('update sacsesfull');
        }
    })
})



app.delete('/courses/:id', function (req, res){
    var new_id = req.params.id
    let db1 = new sqlite3.Database('Data',(err)=>{
        if (!err) {
            db1.run('DELETE FROM coursesTable WHERE id ="'+new_id+'"')
            console.log('Got delete');
            res.send('DELETE');
        }
    })
    
})

app.delete('/exercise/:id', function (req, res){
    var new_id = req.params.id
    let db1 = new sqlite3.Database('Data',(err)=>{
        if (!err) {
            db1.run('DELETE FROM exerciseTable WHERE id ="'+new_id+'"')
            console.log('Got delete');
            res.send('DELETE');
        }
    })
    
})

app.listen(7878); 
