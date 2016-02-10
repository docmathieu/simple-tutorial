<?PHP

require_once('controller/file.php');

header('Content-Type: application/json; charset=utf-8');
$file = new File();
echo $file->getDatasJson();