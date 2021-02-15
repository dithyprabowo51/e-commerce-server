## Global Responses
> These responses are applied globally on all endpoints of Banners

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
### POST /banners

> Add new banners

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    image_url: <banner image_url>,
    status: <banner status>,
    CategoryId: <category id>,
}
```

_Response (200 - OK)_
```
{
    "message": "Created new banner successfully",
    "data": {
            "id": 3,
            "image_url": "image banner 1",
            "status": false,
            "CategoryId": 1,
            "createdAt": "2021-02-15T09:27:35.473Z",
            "updatedAt": "2021-02-15T09:27:35.473Z"
        }
}
```

&nbsp;

### GET /banners

> Read all banners

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
            "id": 3,
            "image_url": "image banner 1",
            "status": false,
            "CategoryId": 1,
            "createdAt": "2021-02-15T09:27:35.473Z",
            "updatedAt": "2021-02-15T09:27:35.473Z"
        }
    ]
}
```

&nbsp;