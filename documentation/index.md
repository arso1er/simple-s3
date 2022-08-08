# `GET` /files/token

Generate upload token endpoint

## Query Params

- **mimeType**
  - Type: String
  - Required: true

## Response

- **Success**

  - token: String

- **Error**
  - error: String

---

# `PUT` /files/upload

Upload file endpoint

## Body (formdata)

- **token**: String (required)
- **file**: File (required)

## Response

- **Success**

  - url: String

- **Error**
  - error: String

---

# `GET` /files/:filename

Download file endpoint

## Response

- **Success**

  - Body content: File

- **Error**
  - 404 message if the file doesn't exist, or 500 error.
