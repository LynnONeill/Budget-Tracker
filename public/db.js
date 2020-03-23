
let db;

const request = indexedDB.open("budgetTrackerDB", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("pendingTrans", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("trans", "trans");
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
//         checkDatabase();
    } else {
        console.log("currently offline")
    }
};

request.onerror = function(event) {
    console.log("Oops! " + event.target.errorCode);
};

// function saveRecord(record) {
//     const transaction = db.transaction(["pending"], "readwrite");
//     const store = transaction.objectStore("pending");
//     store.add(record);
// }

// function checkDatabase() {
//     const transaction = db.transaction(["pending"], "readwrite");
//     const store = transaction.objectStore("pending");
//     const getAll = store.getAll();

//     getAll.onsuccess = function() {
//         if (getAll.result.length > 0) {
//             fetch("/")
//         }
//     }
// }