

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
    if (e.target && e.target.nodeName.toLowerCase() == "input") {
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

var new_todo = document.querySelector(".new-todo");
EventUtil.addHandler(document, 'keyup', function(e) {
    // 输入事项后，添加内容到list当中
    if (new_todo.value != "" && event.keyCode == 13) {
        addItem(new_todo.value);
        new_todo.value = "";
        countList();
    }
});
// TODO
// 当列表项目为 空的时候，则不显示 全选及 footer
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
var tempNum = 0; // 临时ID，用于表示不同的项目数据

function getDate() {

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
    } else {
        removeClass(document.querySelector(".footer"), "hidden");
        removeClass(toggle_all, "hidden");
        addClass(document.querySelector(".footer"), "hidden");
        addClass(toggle_all, "hidden");
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
    console.log("data" + data);
    var curValue = ele.target.previousSibling.dataset.id;
    console.log("curValue:" + curValue);

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
