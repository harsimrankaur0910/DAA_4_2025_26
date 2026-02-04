#include <bits/stdc++.h>
using namespace std;

#define MAX 100

int heap[MAX];
int heapSize = 0;

void heapifyDown(int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < heapSize && heap[left] < heap[smallest])
        smallest = left;

    if (right < heapSize && heap[right] < heap[smallest])
        smallest = right;

    if (smallest != i) {
        swap(heap[i], heap[smallest]);
        heapifyDown(smallest);
    }
}

void heapifyUp(int i) {
    while (i > 0 && heap[(i - 1) / 2] > heap[i]) {
        swap(heap[(i - 1) / 2], heap[i]);
        i = (i - 1) / 2;
    }
}

void insert(int val) {
    if (heapSize == MAX) {
        cout << "Overflow\n";
        return;
    }

    heap[heapSize] = val;
    heapSize++;
    heapifyUp(heapSize - 1);
}

void deleteNode() {
    if (heapSize == 0) {
        cout << "No element\n";
        return;
    }

    heap[0] = heap[heapSize - 1];
    heapSize--;
    heapifyDown(0);
}

// search  any element 
int search(int key) {
    for (int i = 0; i < heapSize; i++) {
        if (heap[i] == key)
            return i;
    }
    return -1;
}

// delete any element 
void deleteAny(int key) {
    int index = search(key);

    if (index == -1) {
        cout << "Element not found\n";
        return;
    }

    heap[index] = heap[heapSize - 1];
    heapSize--;

    heapifyDown(index);
    heapifyUp(index);
}

int main() {
    insert(2);
    insert(1);
    insert(0);
    insert(5);
    insert(3);

    deleteAny(1);

    for (int i = 0; i < heapSize; i++)
        cout << heap[i] << " ";

    return 0;
}
