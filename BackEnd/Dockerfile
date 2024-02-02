# Docker file

# APP
FROM gradle:8.5-jdk17 AS builder
WORKDIR /backend

COPY build.gradle settings.gradle /backend/
COPY . /backend
RUN gradle build -x test --parallel --continue

# jar
FROM openjdk:17-jdk
#ARG JAR_FILE=build/libs/*.jar
#COPY ${JAR_FILE} app.jar

# jar file Copy
COPY --from=builder /backend/build/libs/*.jar /backend/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]