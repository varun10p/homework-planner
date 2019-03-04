<?php
  require "header.php";
?>


  <main>
    <div class="">
      <section>
        <?php
        if (isset($_SESSION['userId'])) {
          echo '<p>You are logged out</p>'
        }
        else {
          echo '<p>You are logged out</p>'
        }
         ?>
        <p>You are logged out</p>
        <p>You are logged in</p>
      </section>
    </div>

  </main>



<?php
  require "footer.php";
?>
