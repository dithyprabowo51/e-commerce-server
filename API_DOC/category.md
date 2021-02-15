## Global Responses
> These responses are applied globally on all endpoints of Products

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
      'name cant be null'
  ]
}
```

_Response (500 - Internal Server Error)_
```
<Internal server error messsages>
```

&nbsp;

## RESTful endpoints
### POST /categories

> Add new products

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    name: <category name>
}
```

_Response (200 - OK)_
```
{
    "message": "Added new category successfully",
    "data": {
        "id": 1,
        "name": "category 1"
    }
}
```

&nbsp;

### GET /categories

> Read all categories

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "name": "category 1",
            "createdAt": "2021-02-14T13:01:18.717Z",
            "updatedAt": "2021-02-14T13:01:18.717Z"
        },
        {
            "id": 2,
            "name": "category 2",
            "createdAt": "2021-02-14T13:21:06.388Z",
            "updatedAt": "2021-02-14T13:21:06.388Z"
        }
    ]
}
```

&nbsp;

### GET /categories/:CategoryId

> Read category by id

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Success",
    "data": {
        "id": 2,
        "name": "category 2",
        "createdAt": "2021-02-14T13:21:06.388Z",
        "updatedAt": "2021-02-14T13:21:06.388Z"
    }
}
```

&nbsp;

### PUT /categories/:CategoryId

> Edit category

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    name: <Category name>
}
```

_Response (200 - OK)_
```
{
    "message": "Updated category successfully",
    "data": {
        "id": 2,
        "name": "category 2",
        "createdAt": "2021-02-14T13:21:06.388Z",
        "updatedAt": "2021-02-15T08:35:50.032Z"
    }
}
```

&nbsp;

### DELETE /categories/:CategoryId

> Delete category

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Deleted category successfully"
}
```

&nbsp;