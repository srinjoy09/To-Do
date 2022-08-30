FROM ibmjava:jre
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]