1.Create user ,
 ->create a new environment with authToken env variable , 
 ->in tests set authtoken to auth token ->
if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token)
}
 provide compulsary name, email , password in body of postman ,select POST in postman

2. LOGIN user
 ->in tests set authtoken to auth token ->
if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token)
}
-> to login user, provide email , password to login in body , JSON format , select POST in postman,

3. logout a user
set Authorization Type-> Inherit from parent , go to the parent collection and select type ->Bearer Token , provide token value -> {{authtoken}}
>POST{{url}}/users/logout  
note->{{url}}=localhost:3000 (env variable)

4.logout from all devices->
Auth->inherit from parent
POST{{url}}/users/logoutall

5.Read user profile->
auth-> inherit from parent
GET{{url}}/users/me

6.Update user info like name , age , email , password
provide info in json in body
PATCH{{url}}/users/me
eg->
{
"age":4,
"name":"Mke",
"password":"newped1221"
}

7.Delete a user
Auth->inherit from parent
DELETE {{url}}/users/me

8.Get a product list no need to authenticate or login 
GET{{url}}/products

9.Cart is already is created with the user ,as single user has a single cart
display current users cart ->
auth->inherit from parent
GET{{url}}/carts/mycart

10.Add more products to cart ->
provide 'productID' of the product ,'Quantity' of the product u want to add to cart in the body in json format
auth->inherit from parent
POST{{url}}/carts/add
eg->
{
	"productID":"2",
	"Quantity":"3"
}


11.Delete a specific product 
auth->inherit from parent
POST{{url}}/carts/remove/:prodId(Id of product access by {{url}}/products)
eg->
{{url}}/carts/remove/2
removes the product we added to the cart above, where 2 is productID of the product

12.Manual updating of cart from scratch
auth->inherit from parent
PATCH {{url}}/carts
eg->passing products property in body 
{
"products":[
	{
	"productID":"3",
	"Quantity":"3"
},
{
	"productID":"1",
	"Quantity":"32"
}
]
}

13.clear cart, clears the whole cart (no products)
auth->inherit from parent
DELETE{{url}}/carts/clear

