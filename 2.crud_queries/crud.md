## CRUD
CRUD is create, read, update and delete.
Mongodb have methods defined for creating a document, updating a record, querying a collection to fetch matched results and deleting a specific or all documents from a collection.

### Create(10 min)
`db.COLLECTION_NAME.insert` method is used to insert a document inside a collection.
It takes objects or arrays[for multiple inserts] with key value pair as only arguments.

```js
db.users.insert({name: 'xyz', email: 'abc@gmail.com'});
// During the insert, mongod will create the _id field and assign it a unique ObjectId value, as verified by the inserted document:

{ 
  "_id" : ObjectId("5c88df5e217aec4256df232c"), 
  "name" : "xyz", 
  "email" : "abc@gmail.com" 
}

``` 
- If you specify `_id` field , it will take that value but the _id value must be unique within the collection to avoid duplicate key error.

- Other functions like `insertOne` and `insertMany` are also used.

##### practice(5 min)
1. create a database, a collection inside that database and insert 1 document into that collection.


### Read(5 min)

Querying a collection for specific document or multiple document uses the form `db.COLLECTION_NAME.find()` or `findOne`. It takes the query as first argument and projection as second.

```js
// when query is blank or empty object
db.users.find() // returns all documents from users
db.users.find({_id: 1234}) // returns single document
db.users.find({}, {name: 1, _id: 0}) // returns all document with only name field 
```

We will learn more about querying in next section.

### Update(10 min)

Updating a document or multiple documents from a collection could range from a single field update to deeply nested or array updates.

Update includes single field update as well as replacing a document entirely.

Update takes 3 arguments
1. query for fetching specific document(Object)
2. new document for updation as second
  - either {} or {} with $set operator
3. options as third argument.
  - {upsert: true} // creates new if not available // default: false
  - {multi: true} // updates multiple document matching // default: false

```js
// $ set returns newer fields with older intact 
db.users.update({_id: 1234}, {$set : {gender: 'male'}})

// just object as update replaces older document
db.users.update({_id: 1234}, {gender: 'male'}) // It replaces old document and only _id and gender field is present in newer document.

```

Updating integer field is done with `$inc` field. $inc operator is used to increment or decrement integer value fields.
```js
// It increments age field by 2.
db.users.update({_id: 1234}, {$inc: {age: 2}})
```

Updating nested objects is similar to normal update.Suppose we have:
```js
// A user object is
{_id: 10, name: {first: 'xyz', last: 'Kumar'}};
// for updating users last name
db.users.update({_id: 10}, {$set: {'name.last': 'singh'}});
// new object is
{_id: 10, name: {first: 'xyz', last: 'singh'}};
```

#### Array Updates(10 min)

$push is used to update an existing array field with new entry.
```js
// Suppose we have an article document
{_id: 23, title: 'intro to mongodb', tags: ['database', 'mongo']}
// Adding single entry(node) to array of tags
db.articles.update({_id: 23}, {$push: {tags: 'node'}})
// Result is
{ "_id" : 23, "title" : "intro to mongodb", "tags" : [ "database", "mongo", "node" ] }


//Adding multiple tags in array
db.articles.update({_id: 23}, {$push: {tags: {$each: ['js', 'NoSQL']}}})
```

To remove elements from an array `$pull` is used.
```js
db.articles.update({_id: 23}, {$pull: {tags: 'node'}})
```
$pop is used to remove elements from either start or end of the array.


We have `updateOne` and `updateMany` methods as well.

### Delete(5 min)
  - `db.COLLCETION_NAME.drop()` is used to drop the entire collection and its documents from the database.

  - `db.COLLECTION_NAME.remove()` takes query object to be removed.
  ```js
  {_id: 23, title: 'intro to mongodb', tags: ['database', 'mongo']}
  // To remove above document
  db.articles.remove({_id: 23});
  ```

