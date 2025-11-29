## Installation
```bash
npm install
npx prisma migrate deploy
```
## Run Application in dev
```bash
npm run dev
```
## CRUD User
### Create user
```
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tuan",
    "email": "tuan@example.com"
  }'
```
### Read User Detail
```
curl http://localhost:3000/api/users/1
```
### Read All User
```
curl http://localhost:3000/api/users
```
### Update User
```
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tuan Updated",
    "email": "tuan.updated@example.com"
  }'
```
### Delete User
```
curl -X DELETE http://localhost:3000/api/users/1
```