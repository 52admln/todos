<?php
session_start();
// session_start();
//
// if(isset($_SESSION['valid_user'])) {
//     echo 'user is ' . $_SESSION['valid_user'];
// } else {
//     echo '<script>window.location.href = "./login.html"</script>';
// }
//
// echo '';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Todos</title>
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <header class="title">
            <h1>todos</h1>
        </header>
        <section class="todoapp">
            <header class="header">
                <input type="text" class="new-todo" name="newtodo" placeholder="What needs to be done?">
            </header>
            <section class="main">
                <input class="toggle-all hidden" type="checkbox">
                <ul class="todo-list">

                </ul>
            </section>
            <footer class="footer hidden">
			<span class="todo-count">
				<strong>0</strong> item left
			</span>
			<ul class="filters">
				<li><a href="#/all" class="selected">All</a></li>
				<li><a href="#/active">Active</a></li>
				<li><a href="#/completed">Completed</a></li>
			</ul>
            
			<button class="clear-completed" style="display: none;">
				Clear completed
			</button>
            <span class="todo-user">
				<strong>
                    <?php
                    if (isset($_SESSION['valid_user'])) {
                        echo $_SESSION['valid_user'];
                    } else {
                        echo "not login";
                    }
                    ?>
            </strong>
			</span>
		</footer>

        </section>
        <footer class="info">
			<p>Double-click to edit a todo</p>
		</footer>
    </body>
    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
    <script src="js/index.js" charset="utf-8"></script>
</html>
