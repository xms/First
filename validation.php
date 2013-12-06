<?php

	//流程控制...要改的地方 @_@
	function getValidResult($_POST)
	{
		$arrData = $_POST;
		
		//錯誤欄位name與顯示名稱對應
		$arrErrItem = array("start_date" => "開放期間(起)",
							"end_date" => "開放期間(迄)",
							"srcIP" => "來源IP",
							"destIP" => "目的IP" );
		//驗證項目與顯示錯誤訊息對應
		$arrErrMsg = array("str_null" => "不可為空值",
							"str_date" => "日期格式錯誤（正確格式如" .@date("Y-m-d"). "）",
							"arr_null" => "至少須填一筆資料",
							"arr_ip" => "與IPv4或IPv6格式不相符" );
		//需要驗證的資料
		$arrItem = array("str_null" => array("start_date", "end_date"),
						 "str_date" => array("start_date", "end_date"), 
						 "arr_null" => array("srcIP", "destIP"),
						 "arr_ip" => array("srcIP", "destIP"));
		//錯誤訊息				
		$strErrorCode = str_replace(":", "：", str_replace(",", "<BR>", getValid($arrData, $arrItem)));
		
		$result = getErrStrToMsg($strErrorCode, $arrErrItem, $arrErrMsg);
		
		return $result;
	}
	
	
	//將取得的Error code轉換成系統顯示的錯誤訊息
	function getErrStrToMsg($strError, $arrErrItem, $arrErrMsg)
	{
		$result = $strError;
		if (empty($strError))
		{
			$result = "correct";
		}
		else
		{
			foreach ($arrErrItem as $k => $v)
				$result  = str_replace($k, $v, $result);
			foreach ($arrErrMsg as $k => $v)
				$result  = str_replace($k, $v, $result);
		}
		return $result;
	}
	
	//設定要驗證的index及項目 (要被驗證的資料, 驗證的項目)
	//null: 不得為空值；其他值: 格式限制
	function getValid($arrData, $arrItem)
	{
		$errItem = null;
		foreach ($arrItem as $kind => $item)
		{
			switch ($kind)
			{
				case "str_null":
					foreach ($item as $v)
					{
						if (empty($arrData[$v]))
							$errItem .= ",$kind:$v";
					}
					break;
				case "str_date":
					foreach ($item as $v)
					{
						if (empty($arrData[$v]))
							$errItem .= ",$kind:$v";
					}
					break;
				case "arr_ip":
					foreach ($item as $v)
					{
						if (!validArrayIP($arrData[$v]))
							$errItem .= ",$kind:$v";
					}
					break;
				case "arr_null":
					foreach ($item as $v)
					{
						if (@isArrayHaveValue($arrData[$v]))
							$errItem .= ",$kind:$v";
					}
					break;
			}
		}
		
		return substr ($errItem,1);
	}
	
	//一次驗證完ARRAY裡所有值(不含空值)有沒有符合IP的格式
	function validArrayIP($arr)
	{
		$result = true;
		foreach ($arr as $k => $v)
		{
			if (!empty($v) && !isIPFormat($v))
			{
				$result = false;
				break;
			}
		}
		
		return $result;
	}
	
	//驗證IP格式
	function isIPFormat($str)
	{
		$result = false;
		if (filter_var($str, FILTER_VALIDATE_IP))
			$result = true;
		
		return $result;
	}
	
	//驗證日期格式
	function isDateFormat($str)
	{
		$result = false;
		if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$date))
			$result = true;
		
		return $result;
	}
	//判斷array裡有沒有至少一個值
	function isArrayHaveValue($arr)
	{
		$result = true;
		foreach ($arr as $k => $v)
		{
			if (!empty($v))
				return false;
		}
		
		return $result;
	}
	
	//判斷是不是陣列
	function isArray($data)
	{
		$result = false;
		if (gettype($data) == "array")
			$result = true;
			
		return $result;
	}
	
	echo $msg ;
?>
<?php

/* 這裡是測試用的code */
	function test()
	{
		$strTest = null;
		foreach ($arrData as $name => $value)
		{
			if (gettype($value) == "array")
			{
				$i = 0;
				foreach ($value as $k => $v)
					$strTest .= "<BR>arrData['$name'][$k] => $v";
			}
			else
				$strTest .= "<BR>arrData['$name'] => $value";
		}
		echo "<br>====$strTest";
	}

?>
