var daVer = 1,              // 数据库版本号
    db = '',                // 用于数据库对象
    dbData = [];            // 用于临时存放数据的数组

// 连接数据库
export function openDB(dbName) {
    var request = indexedDB.open(dbName, daVer);
    request.onsuccess = function (e) {
        db = e.target.result;
        console.log('连接数据库成功');
        // 数据库连接成功后渲染表格
        //vm.getData();  //vm是创建的Vue实例,getData()是实例的method
    }
    request.onerror = function () {
        console.log('连接数据库失败');
    }
    request.onupgradeneeded = function (e) {
        db = e.target.result;
        // 如果不存在HisData对象仓库则创建
        if (!db.objectStoreNames.contains('HisData')) {
            var store = db.createObjectStore('HisData', { keyPath: 'date' });
            //var idx = store.createIndex('index', 'username', { unique: false })
        }
    }
}

/**
 * 保存数据
 * @param {Object} data 要保存到数据库的数据对象
 */
export function saveData(data) {
    var tx = db.transaction('HisData', 'readwrite');
    var store = tx.objectStore('HisData');
    var req = store.put(data);
    req.onsuccess = function () {
        console.log('成功保存id为' + this.result + '的数据');
    }
}

/**
 * 删除单条数据
 * @param {int} id 要删除的数据主键
 */
export function deleteOneData(id) {
    var tx = db.transaction('HisData', 'readwrite');
    var store = tx.objectStore('HisData');
    var req = store.delete(id);
    req.onsuccess = function () {
        // 删除数据成功之后重新渲染表格
        vm.getData();
    }
}

/**
 * 检索全部数据
 * @param {function} callback 回调函数
 */
export function searchData(startDate, endDate) {
    var tx = db.transaction('HisData', 'readonly');
    var store = tx.objectStore('HisData');
    var range = IDBKeyRange.bound(startDate, endDate);
    var req = store.openCursor(range, 'next');
    // 每次检索重新清空存放数据数组
    dbData = [];
    req.onsuccess = function () {
        var cursor = this.result;
        if (cursor) {
            // 把检索到的值push到数组中
            dbData.push(cursor.value);
            cursor.continue();
        } else {
            return dbData;
        }
    }
}