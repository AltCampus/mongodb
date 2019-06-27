## MongoDB(10 min)
MongoDB is a NoSQL database. It is an open-source, cross-platform, document-oriented database written in C++. It uses javascript as their query language.

A record in MongoDB is a document, which is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.

```js
{
  title: '',
  decsription: '',
  tags: ['mongodb', 'node', 'js'],
  author: {
    name: '',
    email: ''
  }
}
```
### Features of mongodb:
  - supports ad hoc queries // you can search by field, range query and it also supports regular expression searches.
  - supports indexing
  - supports replication
  - schemaless database written in c++
  - supports json data model

### Installation (5 min)
Ubuntu: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
MacOS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

 - check version using mongo --version

Once installed, start the mongodb server. It runs on default port `27017`.
Once server is started, we can run mongo scripts in shell by running `mongo` in terminal.

Mongo server can list all the databses present on local system. The structure of mongodb databases are:

  - We have databases at top level.
  - A database consists of list of collections.
  - A collection may contain multiple documents.
  - Each document can have 1 to multiple fields.

We can perform all database operations using mongo shell.
### Shell commands(5 min)
  - db.version()
  - db.stats()
  - db.help()

##### practice 
Run shell commands in mongo shell.

Few common operations are: 
### List databases(2 min)
`show dbs` lists all databases.

### Create database(2 min)
`use DB_NAME` // use sample creates a database sample if not present, otherwise connects to that database.

To check the current databse connected to, use `db`.

##### practice(2 min)
1. create a database of your city name.
2. check list of databases to see newly created database.
3. check which database you are currently connected to ?

### Delete database(2 min)
  - `use DB_NAME` command connects to that specific database.
  - `db.dropDatabase() deletes that database.

### List collections in a database(5 min)
Suppose we want to list all collections from sample database.
  - First we connect to that database using `use sample`.
  - For a list of all collections inside sample database we use `show collections`.
  - `db.getCollectionNames()` inside a database returns same result.

### Create collection
Inside sample database
  - we can use `db.users.insert({name: 'abc'})` to create collection `users` in sample database with a single document having name field in it.

  - We can explicitly create a collection using `db.createCollection('users')` inside sample database.

##### practice 
1. List collections from a database.
2. create a new collection in your city database which you created recently.

### capped collection(5 min)
Capped collection is a fixed size collecction that automatically overwrites its oldest entries when it reaches its maximum size. If you specify true, you need to specify size(in bytes) parameter also.
`db.createCollection("posts", {capped: true, size: 4096})`

  - We can even add maximum number of documents to a capped collection using max field.
`db.createCollection("posts", {capped: true, size: 100000, max: 4000})`

  - Use the isCapped() method to determine if a collection is capped.
  `db.collection.isCapped()`

  - You can convert a non-capped collection to a capped collection with the convertToCapped command:`db.runCommand({"convertToCapped": "mycoll", size: 100000});`

  - The size parameter specifies the size of the capped collection in bytes.

### Drop collection(5 min)
Deletes a collection.
  - `db.COLLECTION_NAME.drop()` drops the whole collection with the contents. 
  - `db.COLLECTION_NAME.remove({})` drops all document from collection but collection remains.

### Rename collection
Renames a collection.
`db.COLLECTION_NAME.renameCollection(NEW_COLLECTION_NAME)` renames collection to newer collection name.  

##### practice(5 min)
1. create a capped collection with maximum of 3 documents and try inserting more than 3 to see the result. 
2. check whether a collection is capped or not ?
3. Delete a collection and then the entire database. 





