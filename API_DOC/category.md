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