;(function() { 

    var randomnos = [],
		list0 = document.getElementById('col0').getElementsByTagName('li'),
		list1 = document.getElementById('col1').getElementsByTagName('li'),
		list2 = document.getElementById('col2').getElementsByTagName('li'),
		magicButton = document.getElementById('magic-button'),
		nextButton = document.getElementById('next-button'),
		list0val = [],
		list1val = [],
		list2val = [],
		answer = 0,
		radiolist = document.querySelectorAll('input[type="radio"]'),
		clickcount = 0;

	function generateRandArr() {
		var i = 0,
			add, num;
		while(i <= 21) {
			add = true;
			num = Math.round(Math.random() * 99);
			for( var j = 0; j <= i; j++ ) { 
				if( num === randomnos[j] ) {
					add = false;
					break;
				}
			}
			if (add === true) {
				randomnos.push(num);
				i++;
			}
		}
	}

    function loadNumbers() {
    	var i, 
    		count = 0;
        for ( i = 0; i < 21; i++ ) {
            document.getElementById('col'+ count).innerHTML += "<li>" + randomnos[i] + "</li>";
            count++;
            if (count > 2) {
				count = 0;
			}
        }
    }
	
	function storeValue() {
		var i;
		for ( i = 0; i < 7; i++ ) { 
			list0val[i] = list0[i].innerHTML;
			list1val[i] = list1[i].innerHTML;
			list2val[i] = list2[i].innerHTML;
		}
	}
	
	function uncheckAll() {
		var i, 
			len = radiolist.length;
		for ( i = 0; i < len; i++ ) { 
			radiolist[i].checked = false;
		} 
	}

	function emptyCols() {
		var i;
		for ( i = 0; i < 3; i++ ) { 
			document.getElementById('col'+ i).innerHTML = "";
		}
	}
	
	function shuffle(arr) {
		var i, 
			count = 0;
		emptyCols();
		for ( i = 0; i < 3; i++ ) { 
			for ( var j = 0; j < 7; j++ ) { 
				document.getElementById('col'+ count).innerHTML += "<li>" + arr[i][j] + "</li>"; 
				count++;
				if (count > 2) {
					count = 0;
				}
			}
		}
	}
	
	function saveAnswer() {
		if ( radiolist[0].checked === true ) { 
			answer = list0val[3];
		}
		else if ( radiolist[1].checked === true ) { 
			answer = list1val[3];
		}
		else { 
			answer = list2val[3];
		}
	}

	function endProcess() {
		var i, 
			len = radiolist.length;
		nextButton.setAttribute('disabled', 'disabled');
		magicButton.setAttribute('class', 'reveal-magic-button');  
		for ( i = 0; i < len; i++ ) { 
			radiolist[i].setAttribute('disabled', 'disabled'); 
			radiolist[i].checked = false;
		}
	}

    function shuffleTrick() {
        if ( radiolist[0].checked === true ) {
            shuffle([list1val, list0val, list2val]);
        }
        else if ( radiolist[1].checked === true ) {
            shuffle([list2val, list1val, list0val]);
        }
        else {
            shuffle([list0val, list2val, list1val]);
        }
    }

	function process() {
		var i, 
			len = radiolist.length,
			falsecount = 0;
		for ( i = 0; i < len; i++ ) { 
			if ( radiolist[i].checked === false ) {
				falsecount++;
			}
		} 
		if (falsecount === 3) { 
			return false; 
		}
		clickcount++;	
		if (clickcount > 2) {
			saveAnswer();		
			emptyCols();
			loadNumbers();
			endProcess();
		}
		else {
            shuffleTrick();
			uncheckAll();
			storeValue();
		}
	}

	function showAnswer() {
		alert(answer);
		magicButton.setAttribute('disabled', 'disabled'); 
	}
	
	function setEvents() {
		nextButton.addEventListener('click', process , false);
		magicButton.addEventListener('click', showAnswer , false);
	}

	function initMagic() {
		generateRandArr();
		loadNumbers();
		storeValue();
		setEvents();
	}

	initMagic();

}());