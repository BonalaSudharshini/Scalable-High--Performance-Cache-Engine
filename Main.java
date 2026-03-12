import java.util.Scanner;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

    static int hits = 0;
    static int misses = 0;

    public static void showGraph() {

        System.out.println("\n=== CACHE PERFORMANCE GRAPH ===");

        System.out.print("Hits   : ");
        for(int i = 0; i < hits; i++){
            System.out.print("#");
        }
        System.out.println(" (" + hits + ")");

        System.out.print("Misses : ");
        for(int i = 0; i < misses; i++){
            System.out.print("#");
        }
        System.out.println(" (" + misses + ")");
    }

    public static void generatePNG(){

        try{
            FileWriter fw = new FileWriter("graph.png");

            fw.write("Cache Hits: " + hits + "\n");
            fw.write("Cache Misses: " + misses + "\n");

            fw.close();

            System.out.println("Graph file generated: graph.png");

        }catch(IOException e){
            System.out.println("Error creating graph file");
        }
    }

    public static void main(String[] args){

        Scanner sc = new Scanner(System.in);

        Cache<String,Integer> cache = new LRUCache<>(3);

        while(true){

            System.out.println("\n===== CACHE MENU =====");
            System.out.println("1. PUT");
            System.out.println("2. GET");
            System.out.println("3. SHOW GRAPH");
            System.out.println("4. GENERATE PNG GRAPH");
            System.out.println("5. EXIT");

            System.out.print("Enter choice: ");
            int choice = sc.nextInt();

            switch(choice){

                case 1:

                    System.out.print("Enter key: ");
                    String key = sc.next();

                    System.out.print("Enter value: ");
                    int value = sc.nextInt();

                    cache.put(key,value);

                    System.out.println("Data inserted");
                    break;

                case 2:

                    System.out.print("Enter key: ");
                    String k = sc.next();

                    Integer result = cache.get(k);

                    if(result == null){
                        System.out.println("Cache Miss");
                        misses++;
                    }
                    else{
                        System.out.println("Value = " + result);
                        hits++;
                    }

                    break;

                case 3:

                    showGraph();
                    break;

                case 4:

                    generatePNG();
                    break;

                case 5:

                    System.out.println("Program Ended");
                    sc.close();
                    return;

                default:

                    System.out.println("Invalid choice");
            }
        }
    }
}
