<?PHP
class File
{
    const DATA_PATH = '../../data/';
    
    function __construct()
    {
        
    }
    
    function getDatasJson()
    {
        $toEncode = [];
        $tutorials = self::getAllTutorials();
        foreach ($tutorials as $tutorial) {
            $settings = (object) self::getSettings($tutorial);
            $tutorialNode = (object) [
                'folder' => $tutorial,
                'defaultLanguage' => $settings->defaultLanguage,
                'facebookComments' => $settings->facebookComments,
                'facebookID' => $settings->facebookID,
                'languages' => self::getLanguagesByTutorialFolder($tutorial)
            ];
            array_push($toEncode, $tutorialNode);
        }
        
        return json_encode($toEncode, JSON_PRETTY_PRINT);
    }
    
    private function getAllTutorials()
    {
        $tutorialsArray = [];
        $results = scandir(self::DATA_PATH);
        
        foreach ($results as $result) {
            if ($result === '.' or $result === '..') {
                continue;
            }
            if (is_dir(self::DATA_PATH . '/' . $result)) {
                array_push($tutorialsArray, $result);
            }
        }
        
        return $tutorialsArray;
    }
    
    private function getTitleByPage($pagePath)
    {
        $file = fopen($pagePath, 'r');
        $firstLine = fgets($file);
        fclose($file);
        
        preg_match('~<ti>(.*?)</ti>~', $firstLine, $firstLine);
        
        return $firstLine[1];
    }
    
    private function getPagesByTutorialFolder($tutoFolder, $lang)
    {
        $pagesArray = [];
        $path = self::DATA_PATH . $tutoFolder . '/' . $lang . '/pages/';
        $results = scandir($path);
        
        foreach ($results as $result) {
            if ($result === '.' or $result === '..') {
                continue;
            }
            if (is_file($path . '/' . $result)) {
                
                $pageNode = (object) [
                    'name' => $result,
                    'title' => self::getTitleByPage($path . '/' . $result)
                ];
                array_push($pagesArray, $pageNode);
            }
        }
        
        return $pagesArray;
    }
    
    private function getLanguagesByTutorialFolder($tutoFolder)
    {
        $languagesArray = [];
        $path = self::DATA_PATH . $tutoFolder . '/';
        $results = scandir($path);
        
        foreach ($results as $result) {
            if ($result === '.' or $result === '..') {
                continue;
            }
            if (is_dir($path . $result)) {
                $lang = $result;
                $settings = (object) self::getLanguageSettings($path . $result);
                
                $langNode = (object) [
                    'title' => $settings->title,
                    'lang' => $lang,
                    'pages' => self::getPagesByTutorialFolder($tutoFolder, $result)
                ];
                
                array_push($languagesArray, $langNode);
            }
        }
        
        return $languagesArray;
    }
    
    private function getLanguageSettings($path)
    {
        $path .= '/setting.ini';
        $data = (object) [
            'title' => ''
        ];
        
        $handle = fopen($path, "r");
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $arr = explode('=', $line);
                switch ($arr[0]){
                    case 'title':
                        $data->title = self::cleanString($arr[1]);
                        break;
                }
            }
            fclose($handle);
        } else {
            
        }
        return $data;
    }
    
    private function getSettings($tutoFolder)
    {
        $path = self::DATA_PATH . $tutoFolder . '/setting.ini';
        $data = (object) [
            'defaultLanguage' => 'en',
            'facebookComments' => 'false',
            'facebookID' => ''
        ];
        
        $handle = fopen($path, "r");
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $arr = explode('=', $line);
                switch ($arr[0]){
                    case 'defaultLanguage':
                        $data->defaultLanguage = self::cleanString($arr[1]);
                        break;
                    
                    case 'facebookComments':
                        $data->facebookComments = self::cleanString($arr[1]);
                        break;
                    
                    case 'facebookID':
                        $data->facebookID = self::cleanString($arr[1]);
                        break;
                }
            }
            fclose($handle);
        } else {
            
        }
        return $data;
    }
    
    private function cleanString($txt)
    {
        return str_replace("\r\n",'', $txt);
    }
}