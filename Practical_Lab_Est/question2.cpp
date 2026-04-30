#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = NULL;
    }
};

class Queue {
    Node* front;
    Node* rear;

public:
    Queue() {
        front = rear = NULL;
    }

    void enqueue(int x) {
        Node* temp = new Node(x);

        if(rear == NULL) {
            front = rear = temp;
            return;
        }

        rear->next = temp;
        rear = temp;
    }

    void dequeue() {
        if(front == NULL) {
            cout << "Queue is empty\n";
            return;
        }

        Node* temp = front;
        front = front->next;

        if(front == NULL)
            rear = NULL;

        delete temp;
    }

    int peek() {
        if(front == NULL) {
            cout << "Queue is empty\n";
            return -1;
        }
        return front->data;
    }

    bool isEmpty() {
        return front == NULL;
    }
};

