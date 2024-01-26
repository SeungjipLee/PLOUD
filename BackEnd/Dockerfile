# Docker file

# jdk17
FROM openjdk:17-jdk

# jar
ARG JAR_FILE=build/libs/*.jar

# jar file Copy
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]

