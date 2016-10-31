

// 跨浏览器事件处理
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};
// ClassName 的 增加删除
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}
function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}





var toggle_all = document.querySelector(".toggle-all");
//  勾选所有项目
toggle_all.addEventListener("click", function() {
    itemDone();
    countList();
});

var todo_list = document.querySelector(".todo-list");
todo_list.addEventListener("click", function(e) {
    // 勾选后，执行完成操作
    if (e.target && e.target.nodeName.toLowerCase() == "input" && e.target.className.toLowerCase() == "toggle") {
        toggleClass(e.target.parentNode.parentNode, "finished");
        itemComplete(e.target.nextSibling, todoItems);
        e.stopPropagation();
    }
    // 点击删除按钮，移除元素
    if (e.target && e.target.nodeName.toLowerCase() == "button") {
        delItem(e, todoItems);
        e.stopPropagation();
    }
    countList();
})
// 双击编辑
todo_list.addEventListener("dblclick", function(e) {
    if(e.target && e.target.nodeName.toLowerCase() == "label"){
        console.log(e.target);
        // var curHTML = e.target.innerHTML;
        console.log(e.target.innerHTML);
        // 值同步
        $(e.target.parentElement.parentElement).find(".edit").val(e.target.innerHTML);
        toggleClass(e.target.parentElement.parentElement, "editing");
    }
})


var new_todo = document.querySelector(".new-todo");
// 回车事件绑定
EventUtil.addHandler(document, 'keyup', function(e) {
    // 输入事项后，添加内容到list当中
    if (new_todo.value != "" && event.keyCode == 13) {
        addItem(new_todo.value);
        new_todo.value = "";
        countList();
    }
    // 编辑状态下，按下回车 进行双向数据同步
    if(e.target && e.target.className.toLowerCase() == "edit" && event.keyCode == 13) {
        if(e.target.value == "" || e.target.value == $(e.target.previousElementSibling).find("label").html()){
            toggleClass(e.target.parentElement, "editing");
            // console.log("pressed not change");
            // TODO
            // 更新 数据
        } else {
            $(e.target.previousElementSibling).find("label").html(e.target.value);
            // console.log("pressed edited");
            var curId = $(e.target.previousElementSibling).find("label").data("id");
            // 更新数据
            for (var index = 0; index < todoItems.length; index++) {
                if (todoItems[index].id == curId) {
                    todoItems[index].todo = e.target.value; // 删除对应的元素
                    break;
                }

            }
            console.log(curId,todoItems);
            toggleClass(e.target.parentElement, "editing");
        }
    }
});

var filters = document.querySelector(".filters");
var filters_btns = document.querySelectorAll(".filters > li > a");
filters.addEventListener("click", function (e) {
    if(e.target && e.target.dataset.status ==  "all") {
        filter("all");
        _activeBtn(e.target);
    }
    if(e.target && e.target.dataset.status ==  "active") {
        filter("active");
        _activeBtn(e.target);
    }
    if(e.target && e.target.dataset.status ==  "completed") {
        filter("completed");
        _activeBtn(e.target);
    }
    function _activeBtn(ele) {
        console.log(hasClass(filters_btns[0], "selected"));
        for(var i=0; i<filters_btns.length; i++) {
            if(hasClass(filters_btns[i], "selected")) {
                removeClass(filters_btns[i], "selected");
            }
        }
        addClass(ele, "selected");
    }
});


var clear_ompleted = document.querySelector(".clear-completed");
clear_ompleted.addEventListener("click", function (e) {

    var delItems = [];
    for(var i=0; i<todoItems.length; i++) {
        if(todoItems[i].completed == true) {
            delItems.push(todoItems[i].id);
        }
    }
    console.log(delItems);
    removeCompleted(delItems);
    e.stopPropagation();
})
function removeCompleted(delArr) {
    debugger;
    for (var index = 0; index < delArr.length; index++) {
        for(var j=0; j<todoItems.length; j++) {
            if (todoItems[j].id == delArr[index]) {
                todoItems.splice(j, 1); // 删除对应的元素
                console.log("find!");
            }
        }
    }
    renderDate(todoItems);
}


// TODO
// 将不同需求 进行封装
// 从数据库获取内容，进行渲染
//  ajax 提交数据请求，返回页面进行渲染
//  返回的数据格式 JSON
//  [
//     {
//         id: 0,
//         todo: "Demo",
//         completed: false
//     },
//     {
//         id: 1,
//         todo: "Demo",
//         completed: true
//     }
//  ]

var todoItems = []; // 存放用于渲染的数组
var tempNum = 0; // 临时ID，用于表示不同的项目数据，后续用数据库读取则自动生成

function getDate() {

}

// 筛选数据进行生成
function filter(type) {
    var _curItems = [];

    if(type == "all") {
        renderDate(todoItems);
        return;
    }
    if(type == "active"){
        _createNewItems(false);
    }
    if(type == "completed") {
        _createNewItems(true);
    }
    function _createNewItems(status) {
        for (var index = 0; index < todoItems.length; index++) {
            if (todoItems[index].completed == status) {
                _curItems.push(todoItems[index]);
            }
        }
    }
    renderDate(_curItems);
}


// 统计未完成项目
var footer = document.querySelector(".footer");

function countList() {
    var item_left = 0;
    for (var i = 0; i < todoItems.length; i++) {
        if (todoItems[i].completed == false) {
            item_left++;
        }
    }
    document.querySelector(".todo-count > strong").innerHTML = item_left;
    if(document.querySelectorAll(".todo").length > 0) {
        removeClass(document.querySelector(".footer"), "hidden");
        removeClass(toggle_all, "hidden");
        document.querySelector(".clear-completed").style.display = "block";
    } else {
        removeClass(document.querySelector(".footer"), "hidden");
        removeClass(toggle_all, "hidden");
        addClass(document.querySelector(".footer"), "hidden");
        addClass(toggle_all, "hidden");

        document.querySelector(".clear-completed").style.display = "block";
    }

}
// 单项完成
function itemComplete(ele, data) {
    // 获取前一个元素的内容
    var curValue = ele.dataset.id;
    for (var index in data) {
        if (data[index].id == curValue) {
            data[index].completed = !data[index].completed;
        }
    }
}

// 添加元素
function addItem(value) {
    todoItems.push({
        id: tempNum,
        todo: value,
        completed: false
    });
    renderDate(todoItems);
    console.log(todoItems);
    tempNum++;
}

// 删除元素
function delItem(ele, data) {
    // 获取前一个元素的内容
    var curValue = ele.target.previousSibling.dataset.id;

    for (var index = 0; index < todoItems.length; index++) {
        if (todoItems[index].id == curValue) {
            console.log("index:" + index);
            var temp = todoItems.splice(index, 1); // 删除对应的元素
            console.log(temp);
        }
    }

    // 删除元素
    ele.target.parentElement.parentElement.remove();
}

//  是否 勾选所有项目
var isChecked = false;

function itemDone() {
    var toggles = document.querySelectorAll(".toggle");
    for (var i = 0; i < toggles.length; i++) {
        if (!isChecked) {
            toggles[i].checked = true;
            removeClass(toggles[i].parentNode.parentNode, "finished");
            addClass(toggles[i].parentNode.parentNode, "finished");
            // 将所有项目标为完成
            for (var index in todoItems) {
                todoItems[index].completed = true;
            }
        } else {
            toggles[i].checked = false;
            removeClass(toggles[i].parentNode.parentNode, "finished");
            for (var index in todoItems) {
                todoItems[index].completed = false;
            }
        }
    }
    isChecked = !isChecked;
    countList();
}

// 渲染数据
function renderDate(data) {
    var htmlOpt = "";
    for (var index=0;index<data.length; index++) {
        var isFinished = "";
        var isCompleted = "";
        // console.log(testJson[index].todo + "/" + testJson[index].completed);
        if (data[index].completed) {
            isFinished = " finished";
            isCompleted = "checked";
        } else {
            isFinished = "";
            isCompleted = "";
        }
        htmlOpt += '<li class="todo' + isFinished + '"><div class="view">' + '<input class="toggle" type="checkbox" ' + isCompleted + '>' + '<label data-id="' + data[index].id + '">' + data[index].todo + '</label>' + '<button class="destroy"></button>' + '</div><input class="edit" type="text"></li>';
    }
    todo_list.innerHTML = htmlOpt;
}

// 初始化，从数据库中获取数据
function init() {
    countList();
}

init();



// var date = [1,2,3,4,1,2,3,8,9];
// var tempArr = [];
// for(var i=0; i<date.length; i++) {
//     if(tempArr.indexOf(date[i]) == -1) {
//          tempArr.push(date[i])
//     }
// }
// console.log(tempArr);
//
