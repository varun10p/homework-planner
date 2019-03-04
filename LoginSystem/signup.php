<?php
  require "header.php";
?>


  <main>
    <div class="">
      <section>
        <h1>Signup</h1>
        <?php
        if (isset($_GET['error'])) {
          if ($_GET['error'] == "emptyfields") {
            echo '<p>Fill in all Fields</p>'
          }
        }
         ?>
        <form class="includes/  signup.inc.php" action="index.html" method="post">
          <input type="text" name="uid" placeholder="Username">
          <input type="text" name="email" placeholder="Email">
          <input type="password" name="pwd" placeholder="Password">
          <input type="password" name="pwd-repeat" placeholder="Repeat Password">
          <button type="submit" name="signup-button">Signup</button>


        </form>
      </section>
    </div>

  </main>



<?php
  require "footer.php";
?>
