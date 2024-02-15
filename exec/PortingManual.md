## 1. 개발환경

|Tech|Stack|Version|
|:---:|:---:|:---:|
|웹서버|Nginx|1.18.0(Ubuntu)|
|WAS|Tomcat||
|**FrontEnd**|Node.js|20.11.0|
||React|18.2.0|
|**BackEnd**|OpenJDK|17|
||SpringBoot|3.2.2|
||Gradle|8.5|


## 2. 설정파일 및 환경 변수

```bash
# DB
# jdbc Driver / url / username / password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=<DB url>
spring.datasource.username=<DB username>
spring.datasource.password=<DB password>

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT
spring.jwt.secret=<jwt secret>
spring.jwt.refreshTokenExperation=604800000
spring.jwt.accessTokenExperation=3600000

# logging
logging.file.name=./ssafy-web.log
logging.level.root=INFO
logging.level.org.apache.tiles=INFO
logging.level.org.springframework.web=DEBUG
logging.level.org.sringframework.boot=DEBUG
logging.level.org.sringframework.security=DEBUG
logging.level.com.ssafy.ploud.domain=DEBUG

spring.security.user.name=ssafy
spring.security.user.password=1234

# OpenVidu
openvidu.url:<OpenVidu url>
openvidu.secret:<OpenVidu secret key>

# ffmpeg
# ffmpeg.filepath=ffmpeg\\bin\\ffmpeg.exe
ffmpeg.filepath=/usr/local/bin/ffmpeg/ffmpeg

# ETRI (KKY accessKey)
erti.pronapi.url=http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor
erti.accesskey=<ERTI accesskey>
etri.languagecode=korean

# AWS S3
cloud.aws.credentials.accessKey=<IAM access key>
cloud.aws.credentials.secretKey=<IAM secret key>
cloud.aws.region.static=ap-southeast-2
cloud.aws.s3.bucket=<S3 bucket name>

# multipart size
spring.servlet.multipart.max-file-size=500MB
spring.servlet.multipart.max-request-size=500MB
```

## 3. 배포 시 특이사항 기재

### A. zeroSSL 인증서 발급

### B. Nginx conf 

**nginx.conf**
```bash
http {
        client_max_body_size 400M;
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
}
```
S3 bucket에 영상을 올리기 위해 max size 설정 

**default.conf**
```bash
server {

    listen 80;
    server_name <domain>;
    return 301 https://$host$request_uri;
}

server {


    listen 443 ssl;

    server_name <domain>;

    # SSL
    ssl_certificate <ssl crt file address>;
    ssl_certificate_key <ssl private key address>;

    # Error log
    access_log   /var/log/nginx/access.log;
    error_log    /var/log/nginx/error.log;

    location /api {
        proxy_pass http://localhost:<BE port>;
    }

    location / {
        proxy_pass http://localhost:<FE port>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### C. Docker

✅ EC2에 Docker 설치

✅ Docker Hub Login

### D. MySQL Container

✅ Docker Hub에서 MySQL 이미지 pull  
```$ docker pull mysql:8.0.35```

✅ MySQL Container 실행  
```$ docker run -d -p {외부포트}:{내부포트} --name mysql --network {네트워크} mysql:8.0.35```  

같은 네트워크 내에서 동작할 수 있도록 --network를 통해 네트워크 지정


### E. Jenkins Container

✅ Docker Hub에서 Jenkins 이미지 pull  
```$ docker pull jenkins/jenkins:latest```

✅ Jenkins Container 실행  
```$ docker run -d -p {외부포트}:{내부포트} -v /jenkins:/var/jenkins_home -v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock jenkin/jenkins:latest```

젠킨스 컨테이너가 도커를 사용할 수 있도록 볼륨 설정

### F. CI/CD

Docker Image를 build 할 때, FE 및 BE 실행

```Docker
# FE Docker file
FROM node:alpine AS builder
WORKDIR /frontend
COPY package.json .
RUN npm install react-scripts -g
RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80

COPY --from=builder /frontend/build /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
```

```Docker
# BE Docker file

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

WORKDIR /backend

# jar file Copy
COPY --from=builder /backend/build/libs/*.jar /backend/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Jenkins PipeLine을 이용해 자동배포  
EC2에 설치한 ffmpeg 실행파일 사용을 위해 볼륨 설정 

```
pipeline {
    agent any

    stages {

        stage('Build BE') {
            steps {
                echo 'Building BE...'
                dir('BackEnd'){
                    script {
                        sh 'docker build -t <docker image name> .'
                    }
                }
            }
        }

        stage('Build FE') {
            steps {
                echo 'Building FE...'
                dir('FrontEnd'){
                    script {
                        sh 'docker build -t <docker image name> .'
                    }
                }
            }
        }

        stage('Deploy BE') {
            steps {
            echo 'Deploying BE...'
                script {
                    sh 'docker stop <docker container> || true'
                    sh 'docker rm <docker container> || true'
                    sh 'docker run -d -p <외부포트>:<내부포트> --name <docker container name> --network <docker network name> -v /usr/local/bin/ffmpeg/ffmpeg:/usr/local/bin/ffmpeg/ffmpeg <docker image name>'
                }
            }
        }

        stage('Deploy FE') {
            steps {
            echo 'Deploying FE...'
                script {
                    sh 'docker stop <docker container> || true'
                    sh 'docker rm <docker container> || true'
                    sh 'docker run -d -p <외부포트>:<내부포트> --name <docker container name> --network <docker network name> <docker image name>'
                }
            }
        }

    }
}
```