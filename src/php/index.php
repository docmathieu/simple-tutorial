<!DOCTYPE html>
<html>
    <head>
        <title>Simple Tutorial</title>
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
        <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no, maximum-scale=1.0" name="viewport">
        <meta content="Simple Tutorial" name="Description">
        <link rel="icon" type="image/png" href="/src/assets/favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <script src="/src/libs/jquery/jquery-1.12.0.min.js" type="text/javascript"></script>
        <script src="/src/js/loader.js" type="text/javascript"></script>
        <script>
            var GET = <?= json_encode(filter_input_array(INPUT_GET)); ?>;
        </script>
    </head>
    <body>
        <div id="fb-root"></div>
        <div id="contentbody"></div>
    </body>
</html>