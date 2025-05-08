# 🧪 API Error Analysis and Bug Report

## ❌ Error in cURL Format (Task 1.A)

### Original cURL:
```bash
curl -L -X POST 'https://reqres.in/api/users' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
--data-raw '{ "name": "David "The Tester" QA", "job": "Engineer" }'
```

### ❗ Problem:
The JSON string contains **unescaped double quotes** inside the `name` field:
```json "David "The Tester" QA" ```
This breaks the JSON format.

### ✅ Corrected Version:
```bash
curl -L -X POST 'https://reqres.in/api/users' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
--data-raw '{ "name": "David \"The Tester\" QA", "job": "Engineer" }'
```

---

## 🐞 Bug Report (Task 2.B)

### Request URLs:
- ✅ [GET] https://reqres.in/api/users/2 → returns user data (valid)
- ❌ [GET] https://reqres.in/api/users/999 → returns 404 (not found)

### 🐞 Bug Report

**Bug Title:** API returns generic 404 response for non-existent user

**Steps to Reproduce:**
1. Send GET request to `https://reqres.in/api/users/999`
2. Inspect the response body and status code

**Expected Result:**
- A meaningful error message indicating that the user does not exist
- Possibly a `null` data object or a `message` field with context

**Actual Result:**
- Returns an empty object (`{}`) or minimal/no data
- No error explanation in the response body

**HTTP Status Code:** 404  
**Timestamp:** 2025-05-08T01:38:07.731272Z

---
