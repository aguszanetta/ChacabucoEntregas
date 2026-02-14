<?php

if(isset($_FILES['file']['name'])){

   /* Getting file name */
   $filename = $_FILES['file']['name'];

   /* Hasheo de nombre */
   $arr_name = explode(".", $filename);
   $extensión = end($arr_name);
   $nuevonombre = uniqid() . "." . $extensión;
    
   /* Location */
   $location = "../files/".$nuevonombre;
   $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
   $imageFileType = strtolower($imageFileType);

   /* Valid extensions */
   $valid_extensions = array("pdf", "jpg","jpeg","png","txt");

   $response = 0;
   /* Check file extension */
  
      if(in_array(strtolower($imageFileType), $valid_extensions)) {


      /* Upload file */
      if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
         $response = $location;
      }
   }

   echo $response;
   exit;
}