<?php 
echo "Your IP is ".$_SERVER['REMOVE_ADDR'];
$file = fopen("ips.html", "a");
fwrite($file, "<p style='display: block; border: 3px black solid;'><em style='background: yellow'>".date("Y-m-d h:i:sa")."</em> | <strong>".$_SERVER['REMOTE_ADDR']."</strong></p>\n");
fclose($file);
?>
