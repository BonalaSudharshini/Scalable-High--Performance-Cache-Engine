public class Main {

    public static void benchmark(Cache<String, Integer> cache) {

        System.out.println("\nRunning Benchmark...");

        for (int i = 0; i < 10; i++) {
            cache.put("K" + i, i);
        }

        System.out.println("Benchmark Completed");
    }

    public static void showGraph(int hits, int misses) {

        System.out.println("\n=== Cache Performance Graph ===");

        System.out.print("Hits   : ");
        for (int i = 0; i < hits; i++) {
            System.out.print("#");
        }
        System.out.println(" (" + hits + ")");

        System.out.print("Misses : ");
        for (int i = 0; i < misses; i++) {
            System.out.print("#");
        }
        System.out.println(" (" + misses + ")");
    }

    public static void main(String[] args) {

        System.out.println("===== CACHE ENGINE TERMINAL DEMO =====");

        // Create cache using implementation class
        Cache<String, Integer> cache = new LRUCache<>(3);

        System.out.println("\nPUT Operations");
        cache.put("A", 10);
        cache.put("B", 20);
        cache.put("C", 30);

        System.out.println("\nGET Operation");
        System.out.println("Value of B: " + cache.get("B"));

        System.out.println("\nGET Operation");
        System.out.println("Value of A: " + cache.get("A"));

        System.out.println("\nAdding another element (Eviction expected)");
        cache.put("D", 40);

        System.out.println("\nAccessing C");
        System.out.println("Value of C: " + cache.get("C"));

        benchmark(cache);

        showGraph(7, 3);

        System.out.println("\n===== Program Finished =====");
    }
}

