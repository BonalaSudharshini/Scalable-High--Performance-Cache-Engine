package cache;

public class CacheStatistics {
    private int hits;
    private int misses;
    private int evictions;

    public void recordHit() { hits++; }
    public void recordMiss() { misses++; }
    public void recordEviction() { evictions++; }

    public void printStats() {
        System.out.println("Hits: " + hits);
        System.out.println("Misses: " + misses);
        System.out.println("Evictions: " + evictions);
    }
}