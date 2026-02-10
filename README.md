register:

curl -X POST localhost:3001/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"André","email":"andre2@test.com","password":"123456"}'


login:

curl -X POST localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"andre2@test.com","password":"123456"}'

token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzcwNjM5NjU1LCJleHAiOjE3NzA3MjYwNTV9.-MgmlW8ruHid8Rgo3E5BFDEQulTPc2Q_k_BR45PayOY

usar token:

curl localhost:3001/products \
-H "Authorization: Bearer SEU_TOKEN"


Login como seller

curl -X POST localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"seller@delivery.com","password":"123456"}'

token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlNFTExFUiIsImlhdCI6MTc3MDY2ODE0MSwiZXhwIjoxNzcwNzU0NTQxfQ.m2H51BwFHhkwC0VzMKE0HkXtFX7d3DiMZd_quIMIYek

Listar pedidos do seller
curl localhost:3001/sales/seller \
-H "Authorization: Bearer TOKEN_SELLER"

login customer

curl -X POST localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"customer@delivery.com","password":"123456"}'


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzcwNjU2ODQxLCJleHAiOjE3NzA3NDMyNDF9.11KAUJGGQiii6gyrisQPVV4rHQCrTdIDb0UanmQdLss
