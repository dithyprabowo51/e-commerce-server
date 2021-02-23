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
### POST /orders

> Add new order

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
    "message": "Added order product successfully",
    "data": {
        "OrderId": 1,
        "ProductId": 9
    }
}
```

&nbsp;

### GET /orders

> read order by UserId

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
    "message": "Success",
    "data": [
        {
            "id": 9,
            "name": "Nike",
            "price": 2000000,
            "image_url": "https://images.unsplash.com/photo-1610664676282-55c8de64f746?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "stock": 30,
            "createdAt": "2021-02-17T14:55:59.371Z",
            "updatedAt": "2021-02-17T16:34:07.718Z",
            "OrderProduct": {
                "OrderId": 2,
                "ProductId": 9,
                "quantity": 2,
                "createdAt": "2021-02-20T13:00:22.689Z",
                "updatedAt": "2021-02-20T13:00:23.797Z"
            }
        },
        {
            "id": 10,
            "name": "Arroys",
            "price": 150000,
            "image_url": "https://images.unsplash.com/photo-1609624520017-d5e83e580dcc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
            "stock": 5,
            "createdAt": "2021-02-17T14:58:31.380Z",
            "updatedAt": "2021-02-17T15:29:29.649Z",
            "OrderProduct": {
                "OrderId": 2,
                "ProductId": 10,
                "quantity": 1,
                "createdAt": "2021-02-20T13:00:27.136Z",
                "updatedAt": "2021-02-20T13:00:27.136Z"
            }
        }
    ]
}
```

&nbsp;

### PATCH /orders/addQuantity

> Add quantity item in order cart

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    ProductId: <id product>
}
```

_Response (201 - OK)_
```
{
    "message": "Add quantity successfully",
    "data": {
        "id": 27,
        "OrderId": 11,
        "ProductId": 10,
        "quantity": 2,
        "createdAt": "2021-02-21T05:15:12.799Z",
        "updatedAt": "2021-02-21T05:20:45.096Z"
    }
}
```

&nbsp;

### PATCH /orders/reduceQuantity

> reduce quantity item in order cart

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    ProductId: <id product>
}
```

_Response (201 - OK)_
```
{
    "message": "Add quantity successfully",
    "data": {
        "id": 27,
        "OrderId": 11,
        "ProductId": 10,
        "quantity": 2,
        "createdAt": "2021-02-21T05:15:12.799Z",
        "updatedAt": "2021-02-21T05:20:45.096Z"
    }
}
```

&nbsp;

### DELETE /orders/deleteItem

> delete item in order cart

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    ProductId: <id product>
}
```

_Response (201 - OK)_
```
{
    "message": "Delete item successfully"
}
```

&nbsp;

### DELETE /orders

> delete / checkout order cart

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
    "message": "Delete order successfully"
}
```

&nbsp;