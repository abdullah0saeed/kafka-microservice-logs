# setup instructions

## 1. using K8s (locally)

- install Docker Desktop if not installed

- clone the repo to your local machine

- run in the project root (to create a local docker image)

```
docker build -t kafka-microservice-logger:1 .
```

- navigate to ./k8s from the project root directory

```
cd k8s
```

- run the following

```
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

- now run this to make sure it is all working

```
kubectl get pod
kubectl get svc
```

- open the localhost on port 3000

```
http://localhost:3000
```

## 2. using Docker compose V2

- clone the repo to your local machine

- install docker-compose if not installed

- run in project root directory

```
docker-compose up
```

- open the localhost on port 3000

```
http://localhost:3000
```

## Test the service using Postman or any other platform

### 1. POST request to set an event

- api :

```
http://localhost:3000/api/logs
```

- request body :

```
{
    "userId":"user001",
    "action":"click event"
}
```

- expected response :

```
{
    "userId": "user001",
    "action": "click event",
    "timestamp": "2025-04-06T04:51:23.072Z"
}
```

### 2. GET request to get a user events list

- api :

```
http://localhost:3000/api/logs?userId=user001&page=1&limit=5
```

- expected response :

```
[
    {
        "_id": "67f2084bdeffd0e52e78f477",
        "userId": "user001",
        "action": "click event",
        "timestamp": "2025-04-06T04:51:23.072Z",
        "__v": 0
    },
    {
        "_id": "67f206d4deffd0e52e78f474",
        "userId": "user001",
        "action": "click event",
        "timestamp": "2025-04-06T04:45:08.546Z",
        "__v": 0
    }
]
```

## Architecture

### MongoDB

To store user events in order to be restored whenever needed.

### Kafka

To perform a real-time event streaming and processing.

### Zookeeper

To manage Kafka brokers, and consumer groups.
