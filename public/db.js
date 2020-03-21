
let db;

const request = indexedDB.open("budgetTracker", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
    alert("indexed DB success!")
    db = event.target.result;

    if (navigator.onLine) {
        console.log("if navigator.online is true")
//         checkDatabase();
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