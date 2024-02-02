# Docker file

# jdk17
FROM openjdk:17-jdk

WORKDIR /backend

COPY build.gradle settings.gradle /backend/

RUN ./gradlew build --no-daemon || return 0
COPY . /backend
RUN ./gradlew build --no-daemon

# jar
ARG JAR_FILE=build/libs/*.jar

# jar file Copy
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

