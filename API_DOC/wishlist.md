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
      'name cant be null',
      'stock cant be empty'
  ]
}
```

_Response (500 - Internal Server Error)_
```
<Internal server error messsages>
```

&nbsp;

## RESTful endpoints
### POST /wishlist

> Add new wishlist

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    ProductId: <product id>,
}
```

_Response (201 - OK)_
```
{
    "message": "Added wishlist successfully",
    "data": {
        "id": 1,
        "UserId": 2,
        "ProductId": 1,
        "createdAt": "2021-02-24T04:31:27.395Z",
        "updatedAt": "2021-02-24T04:31:27.395Z"
    }
}
```

&nbsp;

### GET /wishlists

> read wishlists by UserId

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
            "UserId": 2,
            "ProductId": 1,
            "createdAt": "2021-02-24T04:31:27.395Z",
            "updatedAt": "2021-02-24T04:31:27.395Z",
            "Product": {
                "id": 1,
                "name": "Nike",
                "price": 1000000,
                "image_url": "https://images.unsplash.com/photo-1613740105081-e88271c0211f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "stock": 3,
                "createdAt": "2021-02-24T04:23:30.300Z",
                "updatedAt": "2021-02-24T04:33:11.293Z",
                "Categories": [
                    {
                        "id": 2,
                        "name": "Fashion",
                        "createdAt": "2021-02-24T04:15:01.696Z",
                        "updatedAt": "2021-02-24T04:15:01.696Z",
                        "ProductCategory": {
                            "ProductId": 1,
                            "CategoryId": 2,
                            "createdAt": "2021-02-24T04:23:40.507Z",
                            "updatedAt": "2021-02-24T04:23:40.507Z"
                        }
                    }
                ]
            }
        }
    ]
}
```

&nbsp;

### DELETE /wishlists/:id

> delete wishlists by id

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

_Response (201 - OK)_
```
{
    "message": "Delete wishlist successfully"
}
```

&nbsp;