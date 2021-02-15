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
### POST /products

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
    name: <product name>,
    price: <product price>,
    image_url: <product image_url>,
    stock: <product stock>,
}
```

_Response (200 - OK)_
```
{
    "message": "Added new product successfully",
    "data": {
        id: <new product id>,
        name: <product name>,
        price: <product price>,
        image_url: <product image_url>,
        stock: <product stock>,
    }
}
```

&nbsp;

### PATCH /products/:ProductId

> Set category for a product

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    CategoryId: <id category>,
}
```

_Response (200 - OK)_
```
{
    "message": "Set category successfully"
}
```

&nbsp;

### GET /products

> Get all products

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
[
    {
        "id": 1,
        "name": "product 1",
        "price": 100000,
        "image_url": "image product 1",
        "stock": 10,
        "createdAt": "2021-02-14T12:51:07.051Z",
        "updatedAt": "2021-02-14T12:51:07.051Z",
        "Categories": [
            {
                "id": 1,
                "name": "category 1",
                "createdAt": "2021-02-14T13:01:18.717Z",
                "updatedAt": "2021-02-14T13:01:18.717Z",
                "ProductCategory": {
                    "ProductId": 1,
                    "CategoryId": 1,
                    "createdAt": "2021-02-14T14:03:36.219Z",
                    "updatedAt": "2021-02-14T14:03:36.219Z"
                }
            },
            {
                "id": 2,
                "name": "category 2",
                "createdAt": "2021-02-14T13:21:06.388Z",
                "updatedAt": "2021-02-14T13:21:06.388Z",
                "ProductCategory": {
                    "ProductId": 1,
                    "CategoryId": 2,
                    "createdAt": "2021-02-14T14:05:19.479Z",
                    "updatedAt": "2021-02-14T14:05:19.479Z"
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "product 2",
        "price": 100000,
        "image_url": "image product 2",
        "stock": 10,
        "createdAt": "2021-02-14T13:23:44.147Z",
        "updatedAt": "2021-02-14T13:23:44.147Z",
        "Categories": [
            {
                "id": 1,
                "name": "category 1",
                "createdAt": "2021-02-14T13:01:18.717Z",
                "updatedAt": "2021-02-14T13:01:18.717Z",
                "ProductCategory": {
                    "ProductId": 3,
                    "CategoryId": 1,
                    "createdAt": "2021-02-15T01:28:59.705Z",
                    "updatedAt": "2021-02-15T01:28:59.705Z"
                }
            }
        ]
    }
]
```

&nbsp;

### GET /products

> Get products by categoryId

_Request Header_
```
{
    access_token: <user access token>
}
```
_Request Params_
```
{
    CategoryId: <id category>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 1,
        "name": "product 1",
        "price": 100000,
        "image_url": "image product 1",
        "stock": 10,
        "createdAt": "2021-02-14T12:51:07.051Z",
        "updatedAt": "2021-02-14T12:51:07.051Z",
        "Categories": [
            {
                "id": 2,
                "name": "category 2",
                "createdAt": "2021-02-14T13:21:06.388Z",
                "updatedAt": "2021-02-14T13:21:06.388Z",
                "ProductCategory": {
                    "ProductId": 1,
                    "CategoryId": 2,
                    "createdAt": "2021-02-14T14:05:19.479Z",
                    "updatedAt": "2021-02-14T14:05:19.479Z"
                }
            }
        ]
    }
]
```

&nbsp;

### GET /products/:ProductId

> Get product by id

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
        "id": 3,
        "name": "product 2",
        "price": 100000,
        "image_url": "image product 2",
        "stock": 10,
        "createdAt": "2021-02-14T13:23:44.147Z",
        "updatedAt": "2021-02-15T07:45:32.133Z"
    }
}
```

&nbsp;

### PUT /products/:ProductId

> Edit Product

_Request Header_
```
{
    access_token: <user access token>
}
```

_Request Body_
```
{
    name: <product name>,
    price: <product price>,
    image_url: <product image_url>,
    stock: <product stock>,
}
```

_Response (200 - OK)_
```
{
    "message": "Updated product successfully",
    "data": {
        "id": 3,
        "name": "product 2",
        "price": 100000,
        "image_url": "image product 2",
        "stock": 10,
        "createdAt": "2021-02-14T13:23:44.147Z",
        "updatedAt": "2021-02-15T08:02:31.932Z"
    }
}
```

&nbsp;

### DELETE /products/:ProductId

> Delete Product

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
    "message": "Deleted product successfully"
}
```

&nbsp;