# asw2122_0

[![Actions Status](https://github.com/pglez82/asw2122_0/workflows/CI%20for%20ASW2122/badge.svg)](https://github.com/pglez82/asw2122_0/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pglez82_asw2122_0&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pglez82_asw2122_0)
[![codecov](https://codecov.io/gh/pglez82/asw2122_0/branch/master/graph/badge.svg?token=VN4XG9NTRO)](https://codecov.io/gh/pglez82/asw2122_0)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>


This project is a basic example of website using **React** with **Typescript** and an endpoint using **NodeJS** with **express**.

## Quick start guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/pglez82/asw2122_0`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
If you want to run it without docker. Compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Now the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## More information
You can get more information about the respository in the other README files:
- Documentation: https://github.com/pglez82/asw2122_0/tree/master/docs
- Webapp: https://github.com/pglez82/asw2122_0/tree/master/webapp
- Restapi: https://github.com/pglez82/asw2122_0/tree/master/restapi


## Deployment

For the deployment we have serveral options. The first an more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server). Other options include using the container services that all the cloud services provide. This means, deploying our Docker containers directly. Here I am going to use the first approach. I am going to create a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Create the virtual machine
For this example I am going to create a virtual machine in Azure. Other services like Amazon AWS or Google Cloud, work in the same way.
After logging in into Microsoft Azure with a student account, we can access the services provided. The first one in the creation of Virtual Machines.

![image](https://user-images.githubusercontent.com/10683040/155282509-411030c5-2b9b-4161-bbe8-28cd9626df1e.png)

After clicking in Virtual Machines we will be able to create a new virtual machine. The basic machine (2Gb of RAM), would be enough for this example. Make sure that a pair a keys are generated to be able to access the machine.

![image](https://user-images.githubusercontent.com/10683040/155282817-262a58dd-f203-45bf-aa73-421725aa8b03.png)

Download the private key. We will need it to be able to remotely deploy the application over SSH.

![image](https://user-images.githubusercontent.com/10683040/155282896-5069093e-fa61-4cdb-9cdf-777f9d978f40.png)

After creating the machine, we can access its network information. Here we will have useful information as the public IP, that we will use to access the machine. Also, this is where we are going to configure the ports that will be accessible (in our case, ports 3000 and 5000).

![image](https://user-images.githubusercontent.com/10683040/155283691-7d782018-f61e-43ab-83fd-f52a0cf04725.png)



Steps:
1. Create a virtual machine (Azure, AWS, etc.)
2. Download private key
3. Get IP of the machine
4. Open the ports (3000 and 5000)
5. Create a secret DEPLOY_HOST with the ip of the machine
6. Create a secret DEPLOY_KEY with the content of the private key to access the machine
7. Create a docker-compose-deploy.yml to use with the actions. This docker-compose file will be for deploying to the cloud, the other will be for executing the app locally.
8. Create the new job in the actions file. We are going to deploy using ssh commands with the help of docker compose
9. Modify the Dockerfile of the webapp to accept an argument with the API URL (it won't be localhost when we deploy)
10. Modify the actions to pass this argument when we are in the CI process
11. Update cors in the restapi to accept petitions from every source
