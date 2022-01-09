## Documentación
La documentación de este proyecto se compila localmente y se despliega en GitHub pages.
la url en la que se despliega es: [https://pglez82.github.io/asw2122_0/](https://pglez82.github.io/asw2122_0/).

### Build Documentación
For the documentation we are going to use [AsciiDoc](https://asciidoc.org/) and [PlantUML](https://plantuml.com) and follows the [Arc42](https://github.com/arc42/arc42-template) template. If you want to be able to generate the doc locally you need to install Ruby and some dependencies to translate the asciidoc code into html:

Para la documentación vamos a utilizar [AsciiDoc](https://asciidoc.org/) y [PlantUML](https://plantuml.com). Seguiremos la plantilla [Arc42](https://github.com/arc42/arc42-template). Si quieres generar la documentación de forma local necesitas instalar Ruby y algunas dependencias para traducir el código de AsciiDoc a html.

```shell
cd docs
apt-get install ruby openjdk-8-jre
gem install asciidoctor asciidoctor-diagram
npm install
```
Una vez instaladas estas herramientas podremos generar la documentación
```shell
npm run build
```
La documentación se generará en el directorio `docs/build`.

### Despliegue Documentación
Si queremos desplegar la documentación en GitHub pages, estará accesible en [https://pglez82.github.io/asw2122_0/](https://pglez82.github.io/asw2122_0/) necesitamos ejecutar `npm run deploy`.

Si revisas el `package.json` de este directorio veras como desplegar es tan facil como ejecutar `gh-pages -d build`, que puede hacerse ejecutando directamente `npm run deploy` en el directorio de la doumentación. el paquete `gh-pages` se encarga de subir la documentación generada (basicamente archivo html) a una rama especial de github llamda gh-pages. Todo lo que se suba a esa rama es acesible en la página del repositorio. Ten en cuenta que solo queremos subir ahí la documentación. También es importante que el build de la documentación no se suba a otras ramas del proyecto.