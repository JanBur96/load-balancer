# Todos

Additional Features

- [x] Health Checks: Implement health checks to periodically verify if backend servers are up and running.
- [ ] Error Handling: Add error handling to manage failed requests and retry logic.
- [ ] Scalability: Enhance the load balancer to handle more complex scenarios, like different load balancing strategies or handling of websockets.
- [ ] Logging and Monitoring: Implement logging for requests and server statuses for better monitoring and debugging.
- [ ] Add possibility for other load balancing algorithms

# Notes on Load Balancing

- https://aws.amazon.com/de/what-is/load-balancing/
- https://www.youtube.com/watch?v=sCR3SAVdyCc

## What is load balancing?

A load balancer intercepts all the requests that come to your application and decides which server should handle them.
Load balancing is a technique used to distribute workloads uniformly across servers or other resources. Modern applications have to be able to get used by millions of users at the same time. To achieve this, we don't just need multiple servers, we also need a way to make them work "evenly".

## How does load balancing work?

Companies usually let their applications run on multiple servers. These servers are called nodes. A load balancer is a server that sits in front of these nodes and distributes the workload across them, depending on the load balancer's algorithm (e.g. round robin, least connections, least response time, etc.). The load balancer also monitors the health of the nodes and removes them from the pool if they are not responding.

## Advantages of load balancing

- Scalability (Can remove or add nodes depending on the load)
- High availability
- Better performance
- Security (Can protect against DDoS attacks, since the load balancer can block suspicious IPs, etc.)

## Which types of load balancers are there?

- Application Load Balancer (HTTP/HTTPS)
- Network Load Balancer (TCP/UDP)
- Global Server Load Balancer (DNS)
- DNS Load Balancer (DNS)

## Which type of load balancing technoloigues exist?

- Hardware-Load Balancer (Physical device)
- Software-Load Balancer (Software running on a server)

Difference between hardware and software load balancer:

- Hardware load balancers are usually more expensive, but they are also more reliable and faster.
- Software load balancers are cheaper, but they are also slower and less reliable.
- Hardware load balancers are usually used in data centers, while software load balancers are used in the cloud.
- Software load balancers are more flexible. They can be easily scaled up or down, while hardware load balancers are usually fixed.
