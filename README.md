Este proyecto es un escáner de códigos de barras desarrollado utilizando React Native. Permite a los usuarios escanear códigos de barras o buscar productos ingresando un código manualmente. Utiliza la cámara del dispositivo para leer los códigos de barras y realiza consultas a una API para obtener información sobre los productos escaneados o buscados.

# Dependencias

El proyecto utiliza las siguientes dependencias:

React: Una biblioteca de JavaScript para construir interfaces de usuario.
React Native: Un marco de desarrollo de aplicaciones móviles utilizando React.
Expo: Una plataforma y conjunto de herramientas para construir aplicaciones móviles universales utilizando React Native.
Axios: Una biblioteca de JavaScript para realizar solicitudes HTTP.
React Native Paper: Una biblioteca de componentes de interfaz de usuario para React Native.
Expo Camera: Un módulo de Expo que permite acceder a la cámara del dispositivo.
Expo Splash Screen: Un módulo de Expo para controlar la pantalla de presentación de la aplicación.
Funcionalidades
El proyecto ofrece las siguientes funcionalidades:

Escaneo de códigos de barras utilizando la cámara del dispositivo.
Búsqueda de productos ingresando un código manualmente.
Consulta a una API para obtener información sobre los productos escaneados o buscados.
Visualización de los resultados de búsqueda en un diálogo.
Manejo de errores en caso de fallas en la consulta a la API.
Interfaz de usuario intuitiva con botones y campos de texto.

# Instalación

Para ejecutar este proyecto, se deben realizar las siguientes instalaciones de dependencias:

Instalar Node.js en tu sistema. Puedes descargarlo desde https://nodejs.org/.

Instalar Expo CLI ejecutando el siguiente comando en la línea de comandos:

    npm install -g expo-cli

Clonar el repositorio del proyecto desde https://github.com/leonardou92.

Navegar al directorio raíz del proyecto clonado.

Ejecutar el siguiente comando para instalar las dependencias del proyecto:

    npm install

Configurar la URL de la API en el código fuente del proyecto. Reemplaza 'URL_API' con la URL de la API que proporciona la información de los productos.

La estructura del json de la api debe ser:

    {
        status: true, //true or false
        descripcion: 'producto de prueba', //descripcion del productos
        precio: 10, //precio del producto
        moneda: 'USD' // moneda del precio
    }

Ejecutar el siguiente comando para iniciar la aplicación:

    npx expo start

Escanear el código QR con la aplicación Expo Go en tu dispositivo móvil o ejecutar la aplicación en un emulador.

Una vez completados estos pasos, la aplicación se ejecutará y podrás comenzar a escanear códigos de barras o buscar productos ingresando códigos manualmente.

# CAPTURAS DE PANTALLA
![image](https://github.com/leonardou92/ConsultaProductos/assets/24704063/52719f01-bbe6-4529-827a-987e5cfb76c6)
![image](https://github.com/leonardou92/ConsultaProductos/assets/24704063/3324212a-c46f-4964-a586-998a95b265ec)
![image](https://github.com/leonardou92/ConsultaProductos/assets/24704063/6095f0b5-51e3-44a0-91be-be1fe160e7d8)
![image](https://github.com/leonardou92/ConsultaProductos/assets/24704063/bd4fadd7-4741-4b64-b543-10a88d072046)

# Autor
Este proyecto fue realizado por Leonardo Urdaneta. Puedes encontrar más información sobre el autor en su perfil de GitHub (https://github.com/leonardou92).

¡Disfruta escaneando códigos de barras con esta aplicación!
