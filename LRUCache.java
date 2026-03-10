package cache;

import java.util.HashMap;

public class LRUCache<K, V> implements Cache<K, V> {

    private final int capacity;
    private final HashMap<K, CacheNode<K, V>> map;
    private CacheNode<K, V> head;
    private CacheNode<K, V> tail;
    private CacheStatistics stats;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.stats = new CacheStatistics();
    }

    @Override
    public synchronized V get(K key) {
        CacheNode<K, V> node = map.get(key);

        if (node == null || node.isExpired()) {
            stats.recordMiss();
            return null;
        }

        moveToHead(node);
        stats.recordHit();
        return node.value;
    }

    @Override
    public synchronized void put(K key, V value) {

        if (map.containsKey(key)) {
            CacheNode<K, V> node = map.get(key);
            node.value = value;
            moveToHead(node);
        } else {

            if (map.size() >= capacity) {
                map.remove(tail.key);
                removeNode(tail);
                stats.recordEviction();
            }

            CacheNode<K, V> newNode = new CacheNode<>(key, value, 60000);
            addToHead(newNode);
            map.put(key, newNode);
        }
    }

    private void moveToHead(CacheNode<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    private void addToHead(CacheNode<K, V> node) {
        node.next = head;
        node.prev = null;
        if (head != null) head.prev = node;
        head = node;
        if (tail == null) tail = head;
    }

    private void removeNode(CacheNode<K, V> node) {
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;

        if (node.next != null) node.next.prev = node.prev;
        else tail = node.prev;
    }

    @Override
    public void remove(K key) {
        CacheNode<K, V> node = map.remove(key);
        if (node != null) removeNode(node);
    }

    @Override
    public int size() {
        return map.size();
    }

    public void printStats() {
        stats.printStats();
    }
}