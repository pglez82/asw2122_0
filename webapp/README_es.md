## La webapp
Utilizaremos React con Typescript para la webapp. Vamos a crear la app en el directorio webapp con los siguientes comandos (asegurate que npm está instalado en tu sistema:)
```console
npx create-react-app my-app --template typescript
```
En este punto ya podemos correr la app con:
```console
cd webapp
npm start
```
La app se lanzará y escuchará en el puerto 3000. Ahora mismo la app es un "Hola Mundo" en React.
Vamos a hacer algunas modificaciones en la app, crearemos una app que pida el nombre y el email al usuario y lo envíe a una api rest.Además la webapp listará todos los usuarios registrados.

Basicamente la app debería ser capaz de coger el nombre y el email del usuario, enviarlo a la api y refrescar la lista de los usuarios desde la api. Puedes revisar el código relevante en los componentes
[EmailForm.tsx](src/components/EmailForm.tsx) y [UserList.tsx](src/components/UserList.tsx). El componente [App.tsx](src/App.tsx) funciona como coordinador de los otros componentes.

### Testeando la webapp

#### Tests unitarios
Basicamente estos tests se aseguran que cada componente trabaja de manera aislada. Esto es importante para comprobar que se renderizan correctamente. Estos tests se realizan utilizando jest y pueden ejercutarse con `npm run test`. Cada vez que se ejecutan los tests se realiza un analisis de covertura de código. Si se configura apropiadamente este analisis puede ser explotado por herramientas como [CodeCov](https://about.codecov.io/) para crear informes de covertura de código.

Algunos tests necesitan simular algunas partes de la aplicación. Por ejemplo el componente `EmailForm.tsx` utiliza la api para añadir un usuario. En los tests unitarios debemos simular estas llamadas para obtener resultados más robustos. Puedes revisar el archivo [EmailForm.test.tsx](src/components/EmailForm.test.tsx) para aprender como se hace esto.
Por ejemplo:
```javascript
jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(false))
```
Simularemos la función addUser. En lugar de llamar a la API, simulamos que el servicio web ha fallado al tratar de añadir un usuario.

### Imagen Docker para la aplicación web
El `Dockerfile` para la aplicación web es bastante simple. Solo copia la aplicación, instala las dependencias, crea la versión de producción y corre un servidor web básico para lanzarla.

Necesitamos un servidor para poder correr la aplicación. No es recomendable ejecutar `npm start` en un entorno de producción por lo que utilizaremos [Express](https://expressjs.com/es/). Revisa [server.js](webapp/server.ts) en el directotio webapp para entender la configuración. Mientras corramos el servicio en el puerto 3000 (en localhost) tendremos que conectar este puerto con el puerto de nuestra máquina local.

### Lanzar todo al mismo tiempo (docker-compose)
doker compose permite lanzar todos los contenedores en el orden adecuado. Revisa el archivo [docker-compose.yaml](docker-compose.yaml) para ver la definición de los contenedores y sus procesos de lanzamiento. Aqui tienes los comandos para lanzar el sistema y apagarlo:
```
docker-compose up
```
```
docker-compose down
```
<mark>Nota: Si cambias algo en el código deberás reconstruir las imagenes utilizando la bandera `--build`.</mark>

### Continuous integration/Continuous Delivery
In this step we are going to setup GitHub Actions in order to have CI in our system. The idea is that, every time we create a new release, build the system (restapi and webapp), run the tests, and if everything is ok, build the docker images and upload them to Github packages. Then we can deploy the application using these images.

The workflow for this is in [asw2122.yml](.github/workflow/asw2122.yml). In this file you can see that there are two jobs, one for the restapi, one for the webapp. Jobs are executed in pararel so this will speed up our build.

So, the first to jobs in this file build the webapp and the restapi (in parallel). If everything goes well, check the e2e tests (later in this document) and if these acceptance tests pass ok, create the docker images and deploy them.


### E2E testing
Integration tests is maybe the most difficult part to integrate in our system. We have to test the system as a whole. The idea here is to deploy the system and make the tests using [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) (browser automatization) and [jest-cucumber](https://www.npmjs.com/package/jest-cucumber) (user stories). We will also be using [expect-puppeteer](https://www.npmjs.com/package/expect-puppeteer) to make easier the test writing. All the structure needed is under the `webapp/e2e` directory. This tests can be run locally using `npm run test:e2e` and they will be run also in GitHub Actions, just after the unitary tests. 

In this project the E2E testing user stories are defined using Cucumber. Cucumber uses a language called Gherkin to define the user stories. You can find the example in the `features` directory. Then, the actual tests are in the folder `steps`. We are going to configure jest to execute only the tests of this directory (check the `jest.config.ts` file). 

The E2E tests have two extra difficulties. The first one, we need a browser to perform the tests as if the user was using the application. For this matter, we use `jest-peppeteer` that will launch a Chromium instance for running the tests. The browser is started in the `beforeAll` function. Note that the browser is launched in a headless mode. This is neccesary for the tests to run in the CI environment. If you want to debug the tests you can always turn this feature off. The second problem is that we need to run the restapi and the webapp at the same time to be able to run the tests. For achieving this, we are going to use the package `start-server-and-test`. This package, allows us to launch multiple servers and then run the tests. No need for any configuration. We can configure it straight in the `package.json` file:

```json
"test:e2e": "start-server-and-test 'npm --prefix ../restapi start' http://localhost:5000/api/users/list prod 3000 'cd e2e && jest'"
```

The package accepts pairs of parameters (launch a server and an URL to check if it is running. It also accepts npm commands (for instance prod, for the webapp, that will run `npm run prod`). The last parameter of the task will be launching jest to run the E2E tests.

### Load testing (Gatling)
This part will be carried out using [Gatling](https://gatling.io/). Gatling will simulate load in our system making petitions to the webapp.

In order to use Gatling for doing the load tests in our application we need to [download](https://gatling.io/open-source/start-testing/) it. Basically, the program has two parts, a [recorder](https://gatling.io/docs/current/http/recorder) to capture the actions that we want to test and a program to run this actions and get the results. Gatling will take care of capture all the response times in our requests and presenting them in quite useful graphics for its posterior analysis.

Once we have downloaded Gatling we need to start the [recorder](https://gatling.io/docs/current/http/recorder). This works as a proxy that intercepts all the actions that we make in our browser. That means that we have to configure our browser to use a proxy. We have to follow this steps:

1. Configure the recorder in **HTTP proxy mode**.
2. Configure the **HTTPs mode** to Certificate Authority.
3. Generate a **CA certificate** and key. For this, press the Generate CA button. You will have to choose a folder to generate the certificates. Two pem files will be generated.
4. Configure Firefox to use this **CA certificate** (Preferences>Certificates, import the generated certificate).
5. Configure Firefox to use a **proxy** (Preferences>Network configuration). The proxy will be localhost:8000.
6. Configure Firefox so it uses this proxy even if the call is to a local address. In order to do this, we need to set the property `network.proxy.allow_hijacking_localhost` to `true` in `about:config`. 

Once we have the recorder configured, and the application running (in Heroku for instance), we can start recording our first test. We must specify a package and class name. This is just for test organization. Package will be a folder and Class name the name of the test. In my case I have used `GetUsersList` without package name. After pressing start the recorder will start capturing our actions in the browser. So here you should perform all the the actions that you want to record. In my case I just browsed to the Heroku deployed webapp. Once we stop recording the simulation will be stored under the `user-files/simulations` directory, written in [Scala](https://www.scala-lang.org/) language. I have copied the generated file under `webapp/loadtestexample` just in case you want to see how a test file in gatling looks like.

Podemos modificar nuestro test de carga ,por ejemplo, inyectando 20 usuarios al mismo tiempo:
```
setUp(scn.inject(atOnceUsers(20))).protocols(httpProtocol)
```
changing it in the scala file.
In order to execute the test we have to execute:
```
gatling.sh -s GetUsersExample
```

In the console, we will get an overview of the results and in the results directory we will have the full report in web format.

It is important to note that we could also dockerize this load tests using this [image](https://hub.docker.com/r/denvazh/gatling). It is just a matter of telling the docker file where your gatling configuration and scala files are and the image will do the rest.
