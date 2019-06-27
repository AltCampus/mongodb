## Mongo Query(5 min)
We will be using `find` or `findOne` to query documents most of the time from a collection.

`db.COLLECTION_NAME.find(query, projection)` takes query as its first argument and projection as second.

  - query specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

  - The projection parameter determines which fields are returned in the matching documents.

### Equality Operator(5 min)

Queries for document which matches the exact selection criteria.
```js
// returns document with name as specified
db.COLLECTION_NAME.find({name: "Derek Dawson"})
```
#### null
```js
// The { item : null } query matches documents that either contain the item field 
// whose value is null or that do not contain the item field.
db.COLLECTION_NAME.find({ scores: null });
```

#### $exist
```js
//This query matches documents that do not contain the item field:
find({ scores: {$exists: false}}) 

```

##### practice (5 min)
1. Insert sample data provided into a database.
2. Use `null` and `$exist` to perform query operation and perform all operations listed below for querying.

### Comparison Operator(10 min)
To find documents that match a set of selection criteria.
Comparison operators include `$gt`, `$lt`, `$or`, `$ne`, `$exists`.

1. $gt
  - It checks for an integer value and outputs document based on the comparison result.
  ```js
  // Outputs all document whose weight > 65.
  db.COLLECTION_NAME.find({weight: {$gt: 55}});
  ```
  - Similarily $lt, $lte(less than or equal), $gte(greater than or equal), $ne(not equal) operates.

2. Query for ranges using $gt and $lt operator.
  ```js
  //Returns all document where age > 18 and age < 50.
  db.COLLECTION_NAME.find({age: {$gte: 18, $lt: 50}})
  ```

3. $or
  - To find document which matches one of the multiple query which fits the selection criteria.
  ```js
  // Retrives all document whose age is either greater or equal to 20 or weight above 50.
  db.COLLECTION.find({$or: [{age: {$gte: 40}}, {weight: {$gt: 50}}]})
  ```
4. AND as well as OR operator
  ```js
  // Returns document which satisfies and + any of or conditions.
  db.COLLECTION_NAME.find({gender: 'Female', $or: [{age: {$gte: 20}}, {weight: {$gt: 47}}]})
  ```
### Regex Operator(10 min)
Matches a given pattern and returns document accordingly.

```js
// You're looking for documents that contains in" somewhere in their name.
db.COLLECTION_NAME.find({name: /in/i})
```

### Querying nested objects
Querying nested Object is similar to normal queries.
```js
// Suppose we have a document
{
  name: "",
  email: "",
  family: {
    father: "",
    mother: ""
  }
}
// In order to query using the family's mother field
db.COLLECTION_NAME.find({'family.mother': ""});
``` 

### Querying array fileds(20 min)
Array is considered as first class citizen in mongo documents. We could add fields which could contain array of documents i.e array of integers, strings, arrays or objects.

1. Query all matched collection
```js
// Query all documents which contains a specific field in sports array
db.COLLECTION_NAME.find({sports: 'football'})
```
2. Exact match with order
```js
// query for document which contains exact match with specific order
db.COLLECTION_NAME.find({sports: ['cricket', 'football']})
```
3. Find all match without order($all)
```js
// returns documents which contain all fields along with others but not in order
db.COLLECTION_NAME.find({sports: {$all: ['football', 'hockey']}})
```
4. $in operator
```js
// Retuns all document where sports array conatins one of $in operator fields.
db.COLLECTION_NAME.find({sports: { $in: ['khokho'] }}); 
```
5. Comparison
  - Using $gt or any other operator
  ```js
  // Retuns document where one element can satisfy the first condition and another 
  // element can satisfy the other condition, or a single element can satisfy both
  find({ scores: { $gt: 15, $lt: 20 } });
  ```
  - $elemMatch operator
    - Use $elemMatch operator to specify multiple criteria on the elements of an array such that at least one array element satisfies all the specified criteria.
    ```js
    // returns document if any element from scores array lies in between 22 and 30
    find({ scores : { $elemMatch: { $gt: 22, $lt: 30 } } });
    ```
    - querying array Indexes
      - query conditions for an element at a particular index or position of the array.
    ```js
    find({ 'scores.1': { $gt: 25 } });
    ```
    - query array by number of elements
      - Use the $size operator to query for arrays by number of elements.
    ```js
    find({ scores: { $size: 3 }})
    ```


