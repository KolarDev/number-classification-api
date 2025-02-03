# Number Classification API

## Overview

The **Number Classification API** is a simple RESTful API that takes an integer as input and returns interesting mathematical properties about it, including whether it's prime, perfect, or an Armstrong number, along with a fun fact.

## Features

- Determines if a number is **prime**, **perfect**, or **Armstrong**.
- Identifies whether the number is **odd** or **even**.
- Computes the **sum of its digits**.
- Fetches a **fun fact** about the number using the [Numbers API](http://numbersapi.com/).
- Provides clear error handling and helpful responses.

## Endpoint

### `GET /api/v1/classify-number`

#### Query Parameters

| Parameter | Type    | Required | Description             |
| --------- | ------- | -------- | ----------------------- |
| number    | Integer | Yes      | The number to classify. |

#### Example Request

```
GET /api/v1/classify-number?number=371
```

#### Example Success Response (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Example Error Response (400 Bad Request)

```json
{
  "error": true,
  "message": "Invalid input. Please provide a valid integer in the query parameter. Example: /api/v1/classify-number?number=371"
}
```

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/Code-Linx/number-classification-api.git
cd number-classification-api
```

### 2. Install Dependencies

```sh
npm install  # For Node.js
```

### 3. Start the Server

```sh
node index.js  # Or use nodemon for development
```

## Deployment

To deploy the API, you can use:

- **Heroku**
- **Vercel**
- **Render**
- **AWS Lambda**

Ensure CORS is handled properly to allow cross-origin requests.

## Contributing

Pull requests are welcome! If you find a bug or have suggestions, please open an issue.

## License

MIT License

---

🚀 **Happy Coding!**
