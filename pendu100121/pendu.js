
function Joueur() {
  this.nom="";
  this.score=10000;
  this.time=10000;
}

// declaration de variables globales
var Thof=new Array(new Joueur());

  var word = ['CITRON',
  				'CLEMENTINE',
				'KAKI',
				'KIWI',
				'MANDARINE',
				'ORANGE',
				'PAMPLEMOUSSE',
				'PHYSALIS',
				'POIRE',
				'POMME',
				'ENDIVE',
				'EPINARD',
				'FRISEE',
				'NAVET',
				'OIGNON',
				'PANAIS',
				'POIREAU',
				'RADIS',
				'SALSIFI',
				'TOPINAMBOUR'
  				];

  var mot="";
  var choix =[] ;
  var referenceMot=[] ;
  var referenceChoix=[];
  var scoreMax=8 ;
  var scoreCount=0 ;
  var t1;
  var t2;
  var temps=0;


function init () {
	t1=new Date();
	//console.log("lettre") ;
	// jeu.score=document.getElementById('score');
	// jeu.reponse=document.getElementById('reponse') ;
	// jeu.choix=document.getElementById('choix') ;

	//Choisir un mot
	mot=choisir() ;
	console.log('mot' ,mot) ;
	choix=genereChoix() ;
	console.log(choix);
	referenceChoix=getGenereChoix(choix) ;
	console.log(referenceMot) ;
	referenceMot=getMotchoisie(mot);
	//document.getElementById("taille").innerHTML=referenceMot.length;
	console.log(referenceMot);
	afficheMot(referenceMot);
	afficheChoix(referenceChoix) ;
	//afficheScore();

	document.getElementById('choix').addEventListener('click', function(e){
		if(e.target.matches('li')===true)
			checkLetter(e.target.innerHTML) ;
	});
	
	document.addEventListener('keypress', function(e){
		var letter=String.fromCharCode(e.keyCode);
		if(e.keyCode>=65&&e.keyCode<=90)
			checkLetter(letter);
	});

		// var joueur={nom:this.value, score:scoreCount} ;
		// localStorage['data']=JSON.stringify(joueur);
		// if('data' in localStorage) {
		// 	joueur=JSON.parse(localStorage['data']); 
		// }
		// 	for( nom in localStorage) {
	

		// 		var ntr=document.createElement('tr');
		// 		var ntd1=document.createElement('td');
		// 		ntd1.innerHTML=joueur.nom;
		// 		var ntd2=document.createElement('td');
		// 		ntd2.innerHTML=scoreCount;
		// 		ntr.appendChild(ntd1);
		// 		ntr.appendChild(ntd2);

		// 		// var ntd2=document.createElement('td');
		// 		// ntd2.innerHTML=localStorage.score;
		// 		// ntr.appendChild(ntd2);
		// 	}
		// 	document.getElementById('joueur').appendChild(ntr) ;
	
	// lister le contenu de localStorage
	


} ;






function afficheMot(referenceMot) {
	var lettrehtml=referenceMot.map(function(referencelettre){
		if(referencelettre.Isvisible===true) 
			return `<li>${referencelettre.lettre}</li>` ;
		else
			return `<li>_</li>`;
	})
	document.getElementById('reponse').children[0].innerHTML=lettrehtml.join('');
};

function afficheChoix(referenceChoix) {
	var affichehtml=referenceChoix.map(function(referencelettre){
		if(referencelettre.Ischosen===false)
			return `<div class="btn"><li>${referencelettre.lettre}</li></div>`;
		else
			return `<div id="invisible" class="btn"><li>${referencelettre.lettre}</li></div>`;
	});
	document.getElementById('choix').children[0].innerHTML=affichehtml.join('');
} ;

function afficheScore(){
	//var score=`${scoreCount}/${scoreMax}`;
	document.getElementById('score').innerHTML=`<img src="img/00${scoreCount}.jpg" alt="le pendu">` ;
} ;


function choisir () {
	var index=rand(0 , word.length-1) ;
	return word[index] ;
	
} ;

function rand (min , max) {
	var x=Math.ceil(Math.random()*(max-min) + min) ;
	return x ;
} ;

function getGenereChoix(choix) {
	var referenceChoix=choix.map(function(lettre){
		var Ischosen=false ;
		return { lettre: lettre ,
					Ischosen
		} ;
	});
return referenceChoix ;
} ;

function getMotchoisie(mot) {
	var tabMot=mot.split('');
	var referenceMot=tabMot.map(function(lettre,index){
		var Isvisible=false;
		if(index===0) Isvisible=true;
		if(index===tabMot.length-1) Isvisible=true;
		return {
			lettre:lettre ,
			Isvisible
		};
	}) ;
	return referenceMot ;
} ;

function genereChoix () {
	var lettre=[] ;
	for(var i=65 ; i<=90 ; i++ ) {
		lettre.push(String.fromCharCode(i)) ;
	}
	return lettre;

} ;

function finDuJeu(){
	document.body.style.background="red";
	document.getElementById('choix').innerHTML=`<h1>Vous perdez</h1>`;
	document.getElementById('score').innerHTML=`<img src="img/007.jpg" alt="le pendu">` ;
};

function jeuGagne(){
	document.getElementById('choix').innerHTML=`<h1>Bravo, vous avez la vie sauve</h1>` ;
};

function checkLetter(letter) {
	var tousMotsTrouves=true;
	let presentDansleMot=false ;
	console.log('avant',presentDansleMot);
	referenceMot.forEach(function(letterMapping){
		console.log('lettre', letterMapping.lettre ) ;
		if(letterMapping.lettre===letter){
			letterMapping.Isvisible=true ;
			presentDansleMot=true ;
		};
		if(!letterMapping.Isvisible)
			tousMotsTrouves=false ;
	});

	referenceChoix.forEach(function(letterMapping){
		if(letterMapping.lettre===letter)
			letterMapping.Ischosen=true;
	});
	afficheChoix(referenceChoix);

	if(presentDansleMot===true){
		afficheMot(referenceMot);
	}else {
		scoreCount++;
		afficheScore();
	}
	if(scoreCount===scoreMax)
		finDuJeu();
	if(tousMotsTrouves) {
		t2=new Date();
		temps=Math.floor((t2.getTime()-t1.getTime())/1000);
		jeuGagne();
		document.getElementById('intext').onchange=function(){
			addData();
		}

	};
	//console.log('après', presentDansleMot);
	
} ;

function addData(){
	getData();

	Thof.push({nom:document.getElementById('intext').value, score:scoreCount, temps:temps});
	localStorage.setItem('data', JSON.stringify(Thof)) ;
	showData();
};

function getData(){
	var str=localStorage.getItem('data');
	if(str!=null)
		Thof=JSON.parse(str);
};

function DeleteData(){
	localStorage.clear();

};


function showData(){
	var tab=document.getElementById('joueur');
	getData();
	var t=tab.rows.length;
	while(--t){
		tab.deleteRow(t);
	}
	
	Thof.sort(function(a,b){return a.score-b.score});
	for (var i=0 ; i<Thof.length; i++) {
		var row=tab.insertRow();
		var tr1=row.insertCell();
		var tr2=row.insertCell();
		var tr3=row.insertCell();
		tr1.innerHTML=Thof[i].nom;
		tr2.innerHTML=Thof[i].score;
		tr3.innerHTML=Thof[i].temps+"s";
		

	}
};


window.addEventListener('load' , init);



