export const ALGO_KATAS = [
  {
    name: "Kadane's Algorithm",
    id: "kadanes-algorithm",
    question: "Find a non-empty subarray with the largest sum.",
    templateCode: `#include <vector>
    
int kadanes(vector<int>& nums) {
    // Write your code here.
    return -1;
}`,
  },
  {
    name: "Sliding Window Fixed Size",
    id: "sliding-window-fixed-size",
    question: "Given an array, return true if there are two elements within a window of size 'k' that are equal.",
    templateCode: `#include <vector>

bool closeDuplicates(vector<int>& nums, int k) {
    // Write your code here.
    return false;
}`,
  },
  {
    name: "Sliding Window Variable Size",
    id: "sliding-window-variable-size",
    question: " Find the length of the longest subarray, with the same value in each position.",
    templateCode: `
    #include <vector>

int longestSubarray(vector<int>& nums) {
    int length = 0;
    // Write your code here.
    return length;
}`,
  },
  {
    name: "Two Pointers",
    id: "two-pointers",
    question: "Check if an array is palindrome.",
    templateCode: 
    `bool isPalindrome(string word) {
    // Write your code here.
    return true;
}`,
  },
  {
    name: "Prefix Sum",
    id: "prefix-sum",
    question: "Given an array of values, design a data structure that can query the sum of a subarray of the values.",
    templateCode: `#include <vector>

PrefixSum(vector<int>& nums) {
    // Write your code here.
    return -1;
}`,
  },
  {
    name: "Binary Search",
    id: "binary-search",
    question: "Given an array of sorted values, find the index of a target value.",
    templateCode: `int binarySearch(vector<int>& nums, int target) {
    // Write your code here.
    return -1;
}`,
  },
  {
    name: "Binary Search Tree",
    id: "binary-search-tree",
    question: "Given a binary search tree, find the kth smallest element.",
    templateCode: 
    `struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };

    int kthSmallest(TreeNode* root, int k) {
    // Write your code here.
    return -1;
  }`,
  },
  {
    name: "Depth First Search",
    id: "depth-first-search",
    question: "Given a binary tree, find the sum of all the values in the tree.",
    templateCode: 
    `struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };

    int sum(TreeNode* root) {
        // Write your code here.
        return -1;
    }`,
  },
  {
    name: "Breadth First Search",
    id: "breadth-first-search",
    question: "Given a binary tree, find the sum of all the values in the tree.",
    templateCode:
    `struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };
    
    int sum(TreeNode* root) {
    // Write your code here.
    return -1;
}`,
  },
  {
    name: "Linked List",
    id: "linked-list",
    question: "Given a linked list, reverse the list.",
    templateCode: `
    struct ListNode {
        int val;
        ListNode* next;
        ListNode(int x) : val(x), next(nullptr) {}
    };

    ListNode* reverse(ListNode* head) {
    // Write your code here.
    return nullptr;
}`,
  },
  {
    name: "Stack",
    id: "stack",
    question: "Implement a stack using two queues.",
    templateCode: `#include <queue>
    
    class Stack {
    public:
        Stack() {
        }
        
        void push(int value) {
        }
        
        int pop() {
        }
    };
    `,
  },
  {
    name: "Queue",
    id: "queue",
    question: "Implement a queue using two stacks.",
    templateCode: `#include <stack>
    
    class Queue {
    public:
        Queue() {
        }
        
        void enqueue(int value) {
        }
        
        int dequeue() {
        }
    };`,
  },
  {
    name: "Union Find",
    id: "union-find",
    question: "Given a list of edges, return the number of connected components.",
    templateCode: `#include <vector>
    
    int connectedComponents(vector<vector<int>>& edges) {
        // Write your code here.
        return -1;
    }`,
  },
  {
    name: "Trie",
    id: "trie",
    question: "Implement a trie data structure that supports insert, search, and startsWith methods.",
    templateCode: `Sclass Trie {
    public:
        Trie() {
        }
        
        void insert(string word) {
        }
        
        bool search(string word) {
        }
        
        bool startsWith(string prefix) {
        }
    };`,
  },
  {
    name: "Binary Tree Traversal",
    id: "binary-tree-traversal",
    question: "Given a binary tree, return the values in the tree in pre-order, in-order, and post-order.",
    templateCode: `
    struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };

    vector<int> preOrder(TreeNode* root) {
        // Write your code here.
        return {};
}`,
  },
  {
    name: "Topological Sort",
    id: "topological-sort",
    question: "Given a directed graph, return a topological sort of the graph.",
    templateCode: `#include <vector>

    vector<int> topologicalSort(vector<vector<int>>& graph) {
    // Write your code here.
    return {};
}`,
  },
  {
    name: "Dijkstra's Algorithm",
    id: "dijkstras-algorithm",
    question: "Given a directed graph, find the shortest path from a source node to a target node.",
    templateCode: `#include <vector>

    vector<int> dijkstras(vector<vector<int>>& graph, int source, int target) {
    // Write your code here.
    return {};
}`,
  },
  {
    name: "Bellman-Ford Algorithm",
    id: "bellman-ford-algorithm",
    question: "Given a directed graph, find the shortest path from a source node to a target node.",
    templateCode: `#include <vector>

    vector<int> bellmanFord(vector<vector<int>>& graph, int source, int target) {
    // Write your code here.
    return {};
}`,
  },
  {
    name: "Floyd-Warshall Algorithm",
    id: "floyd-warshall-algorithm",
    question: "Given a directed graph, find the shortest path from a source node to a target node.",
    templateCode: `#include <vector>
    
    vector<int> floydWarshall(vector<vector<int>>& graph, int source, int target) {
    // Write your code here.
    return {};
}`,
  },
  {
    name: "A* Algorithm",
    id: "a-star-algorithm",
    question: "Given a directed graph, find the shortest path from a source node to a target node.",
    templateCode: `#include <vector>

    vector<int> aStar(vector<vector<int>>& graph, int source, int target) {
    // Write your code here.
    return {};
}`,
  },
  {
    name: "Kruskal's Algorithm",
    id: "kruskals-algorithm",
    question: "Given a weighted undirected graph, find the minimum spanning tree.",
    templateCode: `#include <vector>

    vector<vector<int>> kruskals(vector<vector<int>>& graph) {
    // Write your code here.
    return {};
}`,
  },
];
