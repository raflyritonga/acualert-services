
## API Reference

##### Signup

```http
  POST /services/signup
```

##### Signin

```
  POST /services/signin
```

##### Signout

```http
  POST /services/signout
```

##### Update Profile

```http
  PUT /services/profile/update/:userId
```

##### Get all vehicle data by the vehicle type

```http
  GET /services/vehicles/:vehicleType
```

##### Register new vehicle

```http
  PUT /services/vehicles/:vehicleType
```

##### Delete a vehicle

```http
  DELETE /services/vehicle-deletion
```

##### Get all user's vehicles on the home screen based on userId

```http
  GET /services/home/:userId
```

##### Update the height to the custom one

```http
  PUT /services/vehicles/custom-ground-clearance
```

##### Get water level data

```http
  GET /services/iot/water-level
```

##### Get the obstacle

- Latitude
  ```http
    GET /services/iot/lat1
  ```
- Longitude
  ```http
    GET /services/iot/long1
  ```

##### Get user data by userId

```http
  GET /services/home/user/:userId
```
