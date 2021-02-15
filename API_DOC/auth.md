## RESTful endpoints
### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
    email: <your email>,
    password: <your password>
}
```

_Response (200 - OK)_
```
{
    "message": "Login successfully",
    "data": {
        "id": <id user>,
        "email": <email user>,
        "RoleId": <id role>
    },
    "access_token": <access token>
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```
<Internal server error messsages>
```

&nbsp;