Scalable High-Performance Cache Engine

An interactive LRU (Least Recently Used) Cache Engine built using HTML, CSS, and JavaScript to demonstrate the practical implementation of data structures and caching algorithms.
This project visually explains how cache systems work internally by managing frequently accessed data efficiently.

Project Overview

Caching is widely used in modern systems to improve performance by storing frequently accessed data in fast memory.
This project demonstrates how an LRU cache works by allowing users to insert, retrieve, and manage data through a web interface.

The system uses a HashMap for fast lookup and a Doubly Linked List to maintain usage order, ensuring efficient cache operations.

Features

Interactive web-based cache dashboard

Perform cache operations:

PUT (insert data)

GET (retrieve data)

DELETE (remove data)

CLEAR (reset cache)

Display cache state from MRU → LRU

Track cache statistics

Hits

Misses

Hit ratio

Evictions

Operation history tracking

Eviction queue visualization

Benchmark testing (1000 operations)

JSON export and import of cache data

Graph visualization of cache usage

Technologies Used

Frontend

HTML

CSS

JavaScript

Core Data Structures

HashMap

Doubly Linked List

Stack (operation history)

Queue (eviction tracking)

How the LRU Cache Works

User inserts key-value data into the cache.

When data is accessed, it becomes the Most Recently Used (MRU).

The cache maintains items from MRU → LRU order.

When cache capacity is exceeded, the Least Recently Used (LRU) item is automatically removed.

This ensures that frequently accessed data remains available in the cache.

Example Workflow

Set cache capacity.

Insert data using PUT operation.

Retrieve data using GET operation.

Observe cache state updating from MRU → LRU.

When the cache becomes full, the LRU item is evicted.

Benchmark Feature

The Run 1000 Operations button performs automated cache operations to test system performance.
It helps analyze cache efficiency by generating statistics such as hits, misses, and evictions.

Future Enhancements

Integration with backend databases

Distributed cache simulation

Real-time analytics dashboard

Deployment on cloud platforms

Integration with caching systems like Redis

Learning Outcomes

This project demonstrates practical applications of:

Data Structures

Algorithm design

Web development

Performance optimization

Cache management techniques

Author

Sudharshini
CSIT Student – KL University
