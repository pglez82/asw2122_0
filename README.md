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

### Create the virtual machine [Option 1 - Microsoft Azure]
For this example I am going to create a virtual machine in Azure. Other services like Amazon AWS or Google Cloud, work in the same way.
After logging in into Microsoft Azure with a student account, we can access the services provided. The first one in the creation of Virtual Machines.

![image](https://user-images.githubusercontent.com/10683040/155282509-411030c5-2b9b-4161-bbe8-28cd9626df1e.png)

After clicking in Virtual Machines we will be able to create a new virtual machine. The basic machine (2Gb of RAM), would be enough for this example. Make sure that a pair a keys are generated to be able to access the machine.

![image](https://user-images.githubusercontent.com/10683040/155282817-262a58dd-f203-45bf-aa73-421725aa8b03.png)

Download the private key. We will need it to be able to remotely deploy the application over SSH.

![image](https://user-images.githubusercontent.com/10683040/155282896-5069093e-fa61-4cdb-9cdf-777f9d978f40.png)

After creating the machine, we can access its network information. Here we will have useful information as the public IP, that we will use to access the machine. Also, this is where we are going to configure the ports that will be accessible (in our case, ports 3000 and 5000).

![image](https://user-images.githubusercontent.com/10683040/155283691-7d782018-f61e-43ab-83fd-f52a0cf04725.png)

To add more open ports, press in "Add inbound security route". Then, fill the information to open ports 3000 and 5000.

![image](https://user-images.githubusercontent.com/10683040/155284067-e8a85c53-3171-4e40-b773-3d33e05b1159.png)

Now is time for accessing the machine using SSH and installing docker in it. For this, use the public IP of your machine, with the user `azureuser` and the private key that you downloaded previously. If you are not sure how to connect, check the help in the connect tab in Azure. For instance, in my case I use this command for connecting:

```ssh
ssh -i ~/Descargas/DeploymentASW2122_key_0223.pem azureuser@52.147.199.48
```
### Create the virtual machine [Option 2 - Amazon AWS]

Amazon Academy is a platform created by Amazon to prepare students to work with Amazon AWS. In order to create a new virtual machine in AWS we need to access the service EC2.

- Log In at LMS AWS Academy with your student user/passwd
- At the DashBoard, click on the Lab Course AWS Academy Learner Lab - Foundation Services [15286]
- Now you are inside the AWS Course. The Module Menu Item show you available course materials : guides, presentations...Click on Learner Lab - Foundational Services to go to you lab. Lab image:


![image](https://user-images.githubusercontent.com/10683040/158764913-80d6805c-f1ef-434c-a0f8-f2d4e2c09825.png)

- Start the lab by selecting Start Lab
- When the dot next to AWS turns green, your lab environment is ready to use. Click AWS to launch the AWS Console in a new tab. A new tab will open the AWS Management Console when you click on AWS. The system logged you into a temporary AWS account and the lab session will automatically end when the session timer expires. The system will save your work when you end the session or the session timer expires.
- Go to AWS Console Tab and select services EC2

![image](https://user-images.githubusercontent.com/10683040/158765167-0aa50330-8cad-4450-8060-8b972cdb46e4.png)

-  


### Installing Docker and Docker compose in the virtual machine
Now that we are in the terminal, lets execute some commands to install Docker and docker-compose:

```ssh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
### GitHub Actions
Now we have a capable machine of executing Docker containers. Lets configure our project to be able to use it to deploy our application. The first thing will be creating some GitHub secrets to have the information we need. We are going to create three, DEPLOY_HOST, with the IP of the virtual machine; DEPLOY_USER with the user with permissions to access the machine (azureuser), and DEPLOY_KEY with the contents of the file with the private key, so we are able to log in to the machine.

![image](https://user-images.githubusercontent.com/10683040/155285731-4ecd6d29-b2f6-46ee-959b-689ea9f69fc7.png)

Now we are going to create a new docker-compose file called docker-compose-deploy.yaml that will contain the specific docker-compose instructions to deploy the application:

```yaml
version: '3.5'
services:
  restapi:
    image: ghcr.io/pglez82/asw2122_0/restapi:latest
    ports:
      - "5000:5000"
  webapp:
    image: ghcr.io/pglez82/asw2122_0/webapp:latest
    ports:
      - "3000:3000"
    depends_on: 
      - restapi
```
Note that in this file we are using the images that we uploaded to the github registry instead of building them from scratch.

Now we can configure our actions file to include a new job `deploy` that will be in charge of deploying this docker-compose file to the virtual machine. It will be executed after pushing the docker images to the registry.

```yaml
deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-restapi,docker-push-webapp]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/pglez82/asw2122_0/master/docker-compose-deploy.yml -O docker-compose.yml
          docker-compose stop
          docker-compose rm -f
          docker-compose pull   
          docker-compose up -d
```

Not that this job is executed after pushing the images to the registry. We are just logging in to the machine over SSH and stoping any running containers, pulling the new images and launching everything up.

### Extra modifications needed

In order for everything to work, we need to make some extra modifications in the project. There are related with the restapi URL and how React works. In the webapp code we have in the `src/api/api.ts` file the following line:

```typescript
const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
```
This means that React will look for an environment variable and if it exists, it will take the `apiEndPoint` from there, chosing localhost in anyother case. Environment variables in React are picked up in building time and not in execution time. That means we need to pass this variable when we are building the docker image before deploying. For that we need to change the Dockerfile for the webapp and add the following lines before `npm run build`:
```yaml
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI
```
Now this Dockerfile has an argument (with a default value) that will be create the `REACT_APP_API_URI` environment variable before building the production release of the webapp. We need to pass this argument in the GitHub Actions file, when building the webapp image, that is in the job `docker-push-webapp`. 

```yaml
env:
   API_URI: http://${{ secrets.DEPLOY_HOST }}:5000/api
```
Lastly we need to configure CORS accept petitions from all the sources in the restapi. This means changing the cors initialization in `restapi/server.ts` to:
```typescript
app.use(cors());
```
### Creating a new release

Everything is ready now to make the deploy. For that we need to create a new release. That will fire up the deployment process that we have just configured:
![image](https://user-images.githubusercontent.com/10683040/155293978-8e77e821-ed21-4f28-abd9-282ae9e5661b.png)

After the actions process is finished, we can access the application using the IP of our virtual machine in the port 3000. Note that is very simple to modify the application to work in the port 80 instead. We only need to open that port and configure react to use this port instead.

![image](https://user-images.githubusercontent.com/10683040/155297402-41c09d54-8160-4832-be04-21951d18bc28.png)



