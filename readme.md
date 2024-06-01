# Acualert Services

Acualert Services is a backend API designed to support the Acualert app, which functions as a real-time flood warning system. The primary objective of Acualert Services is to provide reliable and timely data processing, management, and distribution to ensure that users receive accurate flood warnings and updates.

## API Reference

##### Signup

```
  POST /services/signup
```

##### Signin

```
  POST /services/signin
```

##### Signout

```
  POST /services/signout
```

##### Update Profile

```
  PUT /services/profile/update/:userId
```

##### Get all vehicle data by the vehicle type

```
  GET /services/vehicles/:vehicleType
```

##### Register new vehicle

```
  PUT /services/vehicles/:vehicleType
```

##### Delete a vehicle

```
  DELETE /services/vehicle-deletion
```

##### Get all user's vehicles on the home screen based on userId

```
  GET /services/home/:userId
```

##### Update the height to the custom one

```
  PUT /services/vehicles/custom-ground-clearance
```

##### Get water level data

```
  GET /services/iot/water-level
```

##### Get the obstacle

- Latitude
  ```
    GET /services/iot/lat1
  ```
- Longitude
  ```
    GET /services/iot/long1
  ```

##### Get user data by userId

```
  GET /services/home/user/:userId
```
