const express = require('express');
const bdparser =  require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bdparser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemsSchema = mongoose.Schema({
    name:String
});
const listSchema = mongoose.Schema({
    name:String,
    item:[itemsSchema]
});

const List = mongoose.model('List',listSchema);
const Item = mongoose.model('Item',itemsSchema);
const item1 = new Item({
    name:'Welcome to your todo list'
});
const item2 = new Item({
    name:'Hello, this is a shinny day'
});
const item3 = new Item({
    name:'Your are better than yesterday'
});
const defaultItem = [item1,item2,item3];



app.get('/',function (req,res) {  
    Item.find({},function (err,foundItem) {  
        if(foundItem.length === 0){
            Item.insertMany(defaultItem,function (err) {  
                if (err) {
                    console.log(err);
                }else{
                    console.log('Successfully inserted')
                }
            });
            res.redirect('/');
        }else{
            res.render('list',{listTitle:'ToDay',newListItems:foundItem});
        }
    })


});
app.post('/',function(req,res){
    let newItem =  req.body.newItem;
    let listItem = req.body.list;

   const item = new Item({
       name:newItem
   });
   if (listItem === 'ToDay') {
    item.save();
    res.redirect('/');
   }else{
       List.findOne({name:listItem},function (err,foundlist) {  
           foundlist.item.push(item);
           foundlist.save();
           res.redirect('/'+listItem)
       })
   }
   

});

app.post('/delete',(req,res)=>{
    const itemID = req.body.checkbox;
    const listName = req.body.listName;
    if(listName === 'ToDay'){
        Item.findByIdAndRemove(itemID,function (err) {  
            if (err) {
                console.log(err);
            }else{
                res.redirect('/');
                console.log('Successfully deleted')
            }
        })
    }else{
        List.findOneAndUpdate({name:listName}, {$pull:{item:{_id:itemID}}},function (err,foundlist) {  
            if(!err){
                res.redirect('/'+listName)
            }
        })
    };
   
})


app.get('/:params',function (req,res) {  
    const Params = _.capitalize(req.params.params);
    
    List.findOne({name:Params},function(err,foundlist){
        if(!err){
            if(!foundlist){
                const list = new List({
                    name:Params,
                    item:defaultItem
                });
                list.save();
                res.redirect('/'+Params);
            }else{
                res.render('list',{listTitle:foundlist.name,newListItems:foundlist.item});
            }
        }
    });
})
app.get('/about',function (req,res) {  
    res.render('about');
});
app.listen(3000,function () {  
    console.log('Server is running on port 3000')
});
// let currendDay = today.getDay();
// let day = '';
//    switch (currendDay) {
//        case 0:
//            day='Sunday';
//            break;
//            case 1:
//            day='Monday';
//            break;
//            case 2:
//            day='Tuesday';
//            break;
//            case 3:
//            day='Wednesday';
//            break;
//            case 4:
//            day='Thursday';
//            break;
//            case 5:
//            day='Friday';
//            break;
//            case 6:
//            day='Saturday';
//            break;
   
//        default:
//         console.log('Error: current day is equal to ' + currendDay)
//            break;
//    }