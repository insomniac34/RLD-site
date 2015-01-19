<?php
	//written by Tyler Raborn

	class Logger 
	{
		private $curScript;
		public function __construct($curScript)
		{
			$this->curScript = $curScript;
		}

		public function debug($msg)
		{
			$log = fopen("log.txt", "a");

			if (flock($log, LOCK_EX))
			{
				$currentTime = date('Y-m-d H:i');
				fwrite($log, "[ DEBUG ".$this->curScript."] [ $currentTime ] ".$msg."\n");	
			}
			
			flock($log, LOCK_UN);
			fclose($log);
		}

		public function info($msg)
		{
			$log = fopen("log.txt", "a");

			if (flock($log, LOCK_EX))
			{
				$currentTime = date('Y-m-d H:i');
				fwrite($log, "[ INFO ".$this->curScript."] [ $currentTime ] ".$msg."\n");	
			}
			
			flock($log, LOCK_UN);
			fclose($log);
		}	

		public function error($msg)
		{
			$log = fopen("log.txt", "a");

			if (flock($log, LOCK_EX))
			{
				$currentTime = date('Y-m-d H:i');
				fwrite($log, "[ INFO ".$this->curScript."] [ $currentTime ] ".$msg."\n");	
			}
			
			flock($log, LOCK_UN);
			fclose($log);
		}		
	}
?>
