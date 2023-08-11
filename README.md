## microservices-backend-application-for-a-simple-blogging-platform-using-Node.js
## Getting Started
###:- Prerequisites<br />
postgres database
### Installation<br />
use yarn or npm

## Configuration
env file configuration for each server<br />
:- for auth-server<br />
![Screenshot from 2023-08-11 03-21-21](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/2d5a01e9-dea1-4e29-8f1d-8fe0c5dbf668)<br />
:-main-server<br />  
![Screenshot from 2023-08-11 03-28-01](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/0ec109cf-f74b-4b4b-ad4d-6e8ae9c7ef63)<br />
:-blogging-server<br />
![Screenshot from 2023-08-11 03-31-20](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/7d272a9c-b23f-4de5-9829-e927675bcef1)
## API Endpoints
:-auth-server<br/>
GET:localhost:4001/api/auth/ping<br/>
![Screenshot from 2023-08-11 03-45-29](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/c8980c7e-172e-4719-a008-870aac28289c)<br/>
POST:localhost:4001/api/auth/user/register<br/>
![Screenshot from 2023-08-11 03-55-55](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/a83c30be-96d5-4fa6-8f87-5302f8b5f947)<br/>
POST:localhost:4001/api/auth/user/login<br/>
![Screenshot from 2023-08-11 04-00-32](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/3af8410e-8b48-41b1-a93a-db25150dc631)
GET:localhost:4001/api/auth/user/refresh<br/>
![Screenshot from 2023-08-11 04-13-16](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/d1b568c6-0e0f-4a51-bbd8-0ed63f758fe1)<br/>
GET:localhost:4001/api/auth/user/logout<br/>
![Screenshot from 2023-08-11 04-33-54](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/f041466d-341f-4327-b76b-de29fd872e99)
DELETE:localhost:4001/api/auth/user/deactivate<br/>
![Screenshot from 2023-08-11 05-13-46](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/3bab3ad5-a150-47bb-89e9-4d97b348a59b)
POST:localhost:4001/api/auth/media/upload/single<br/>
![Screenshot from 2023-08-11 13-50-14](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/d047e2a1-0724-4513-b6a1-4bacef51f821)
POST:localhost:4001/api/auth/user/profile<br/>
![Screenshot from 2023-08-11 16-17-56](https://github.com/amitsafi45/microservices-backend-application-for-a-simple-blogging-platform-using-Node.js./assets/106763609/d7b86b97-6f13-49db-8e66-d6c52fbe35a2)
