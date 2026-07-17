#!/usr/bin/env bash
echo -e "\n\ncurl -s -X GET localhost:8080/api/customer/2"
curl -s -X GET localhost:8080/api/customer/2

echo -e "\n\ncurl -s X GET localhost:8080/api/customer/4"
curl -s -X GET localhost:8080/api/customer/4

echo -e "\n\ncurl -s -X POST localhost:8080/api/create-account \\
        -H "Content-Type: application/json" \\
        -d '{"acctNumber": 4, "firstName":"Jane", "lastName":"Doe", "password": "789"}'"
curl -s -X POST localhost:8080/api/create-account \
        -H "Content-Type: application/json" \
        -d '{"acctNumber": 4, "firstName":"Jane", "lastName":"Doe", "password": "789"}'
echo -e "\n\ncurl -s -X GET localhost:8080/api/customer/4"
curl -s -X GET localhost:8080/api/customer/4
echo -e "\n\ncurl -s -X DELETE localhost:8080/api/customer/4"
curl -s -X DELETE localhost:8080/api/customer/4
echo -e "\n\ncurl -s -X GET localhost:8080/api/customer/4"
curl -s -X GET localhost:8080/api/customer/4
