# expenseSpy Api
To fetch records, add record, fetch a single record, delete a record


## Contribution
Feel free to contribute :)


## GET (to fetch all records)
## URL /expenses
## Response
[
    {
        "_id": "5f626f01fb5a3f20d854ebf1",
        "expensetype": "expenses",
        "title": "movie",
        "amount": {
            "$numberDecimal": "500"
        },
        "__v": 0,
        "createdAt": "2020-09-27T13:16:26.300Z"
    },
    {
        "_id": "5f6615b6da61b810fc92d4b8",
        "expensetype": "expenses",
        "title": "movie",
        "amount": {
            "$numberDecimal": "500"
        },
        "__v": 0,
        "createdAt": "2020-09-27T13:16:26.301Z"
    }
]
## POST (To add records)
## URL /expenses
## Request
Header Content-Type : application/json
{
  "expensetype": "expense",
  "title": "movie",
  "amount": "1000.00"
}
## Error Response
{
    "message": "Expensetype can not be null"
}
## Success Response
{
    "_id": "5f709262952ab700d4838edf",
    "expensetype": "expense",
    "title": "movie",
    "amount": {
        "$numberDecimal": "1000.00"
    },
    "createdAt": "2020-09-27T13:23:46.034Z",
    "__v": 0
}
## GET (To find one record)
## URL /expenses/:id
## Response
{
    "_id": "5f709262952ab700d4838edf",
    "expensetype": "expense",
    "title": "movie",
    "amount": {
        "$numberDecimal": "1000.00"
    },
    "createdAt": "2020-09-27T13:23:46.034Z",
    "__v": 0
}
## DELETE (To delete a record)
## URL /expenses/:id
## Response
{
    "message": "Deleted succssfully!!"
}