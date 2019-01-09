const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rectWidth=20;
const ROWS=20;
const COLS=10;
//const BORDER="#FFFFFF";
//const BOARD="#000000";
const BORDER="#000000";
const BOARD="#AAAAAA";
const O = [
[0,1,1,0],
[0,1,1,0],
[0,0,0,0],
[0,0,0,0]
];
const I = [
[0,2,0,0],
[0,2,0,0],
[0,2,0,0],
[0,2,0,0]
];
const L = [
[0,3,0,0],
[0,3,0,0],
[0,3,3,0],
[0,0,0,0]
];
const J = [
[0,0,4,0],
[0,0,4,0],
[0,4,4,0],
[0,0,0,0]
];
const S = [
[0,0,5,5],
[0,5,5,0],
[0,0,0,0],
[0,0,0,0]
];
const Z = [
[6,6,0,0],
[0,6,6,0],
[0,0,0,0],
[0,0,0,0]
];
const T = [
[7,7,7,0],
[0,7,0,0],
[0,0,0,0],
[0,0,0,0]
];
/*
1-O
2-I
3-L
4-J
5-S
6-Z
7-T
*/

var currentX=0;
var currentY=0;
var currentPiece=L;
function getRandomPiece()
{
	var value=Math.floor((Math.random() * 7) + 1);
	switch(value)
	{
		case 1:
		return O;
		case 2:
		return I;
		case 3:
		return L;
		case 4:
		return J;
		case 5:
		return S;
		case 6:
		return Z;
		case 7:
		return T;
	}
}
function getColorFromValue(value)
{
	switch(value)
	{
		case 1:
		return "#FFFF00";
		break;
		case 2:
		return "#0000FF";
		break;
		case 3:
		return "#FF8C00";
		break;
		case 4:
		return "#FF00FF";
		break;
		case 5:
		return "#FF0000";
		break;
		case 6:
		return "#00FF00";
		break;
		case 7:
		return "#8200FF";
		break;
	}
	return "#FFFFFF";
}

function isEmptyRow(piece,row)
{
	for(i=0;i<4;++i)
	{
		if(piece[row][i] > 0)
			return false;
	}
	return true;
}
function isEmptyCol(piece,col)
{
	for(i=0;i<4;++i)
	{
		if(piece[i][col] > 0)
			return false;
	}
	return true;
}

function findTop(piece)
{
	var i=0;
	while(i<4){
		if(!isEmptyRow(piece,i))
			return i;
	i++;
	}
return 0;
}

function findBottom(piece)
{
	var i=3;
	while(i>=0)
	{
		if(!isEmptyRow(piece,i))
			return i;
		i--;
	}
return 0;
}

function findLeft(piece)
{
	var i=0;
	while(i<4)
	{
		if(!isEmptyCol(piece,i))
			return i;
	i++;
	}
return 0;
}

function findRight(piece)
{
	var i=3;
	while(i>=0){
		if(!isEmptyCol(piece,i))
			return i;
	i--;
	}
return 0;
}

function drawPiece(x,y,piece)
{
	var xtop=findTop(piece);
	var bottom=findBottom(piece);
	var left =findLeft(piece);
	var right=findRight(piece);
	var currentX=x;
	var currentY=y;
	for(i=xtop;i<=bottom;++i)
	{
	for(j=left;j<=right;++j){
			if(piece[i][j]>0)
			{
				color = getColorFromValue(piece[i][j]);
				drawSquare(currentX,currentY,BORDER,color);
			}
			currentX=currentX+1;
			}
			currentY = currentY + 1;
			currentX=x;
	}
}
function drawSquare(x,y,borderColor,backgroundColor)
{
	context.fillStyle = backgroundColor;
	context.fillRect(x*rectWidth,y*rectWidth,rectWidth,rectWidth);
	context.strokeStyle=borderColor;
	context.lineWidth = 1;
	context.strokeRect(x*rectWidth,y*rectWidth, rectWidth, rectWidth);
}
var board =[];
function initBoard()
{
	for(i=0;i<ROWS;i++)
	{
		board[i]=[];
		for(j=0;j<COLS;j++)
			board[i][j]=0;
	}
}
function addPieceToBoard(piece)
{
	var xtop=findTop(piece);
	var bottom=findBottom(piece);
	var left =findLeft(piece);
	var right=findRight(piece);
	var XOffset=0;
	var YOffset=0;
	for(i=xtop;i<=bottom;i++)
	{
		for(j=left;j<=right;j++)
		{
			if(((currentX + XOffset) < COLS) && ((currentY + YOffset) < ROWS))
			{
				if(piece[i][j]>0)
				{
				board[currentY+YOffset][currentX+XOffset]=piece[i][j];
				}
			}
			XOffset++;
		}
		YOffset++;
		XOffset=0;
	}
	console.log(board);
}
function drawBoard()
{
	//context.fillStyle = "#000000";
	//context.fillRect(0,0,200,400);
	for(i=0;i<ROWS;i++)
		for(j=0;j<COLS;j++)
		{
			if(board[i][j]==0)
			{
				drawSquare(j, i,BORDER,BOARD);
			}
			else
			{
				color = getColorFromValue(board[i][j]);
				drawSquare(j, i,BORDER,color);
			}
		}
}
function colidesRight(piece,x,y)
{
	var xtop=findTop(piece);
	var bottom=findBottom(piece);
	var left =findLeft(piece);
	var right=findRight(piece);
	var checkCol= x+(right-left)+1;
	var currentChecked=right;
	if(checkCol < COLS && checkCol >=0)
	{
		do{
		var YOffset=0;
		for(i = xtop; i<=bottom;i++)
		{
			if(board[y+YOffset][checkCol] > 0 && piece[i][currentChecked]>0)
					return true;
			YOffset++;
		}
		currentChecked--;
		checkCol--;
		}
		while(currentChecked >=left && checkCol >=0)
	}
	return false;
}
function colidesLeft(piece,x,y)
{
	var xtop=findTop(piece);
	var bottom=findBottom(piece);
	var left =findLeft(piece);
	var right=findRight(piece);
	var checkCol= x-1;
	var currentChecked=left;
	if(checkCol < COLS && checkCol >=0)
	{
		do{
		var YOffset=0;
		for(i = xtop; i<=bottom;i++)
		{
			if(board[y+YOffset][checkCol] > 0 && piece[i][currentChecked]>0)
					return true;
			YOffset++;
		}
		currentChecked++;
		checkCol++;
		}
		while(currentChecked <=right && checkCol < (x+ right-left+1)  )
	}
	return false;
}
function colides(piece,x,y)
{
	var xtop=findTop(piece);
	var bottom=findBottom(piece);
	var left =findLeft(piece);
	var right=findRight(piece);
	var checkRow= y+(bottom-xtop)+1;
	var currentChecked=bottom;
	if(checkRow < ROWS && checkRow >=0)
	{
		do{
		var XOffset=0;
		for(i = left; i<=right;i++)
		{
			if(board[checkRow][x+XOffset] > 0 && piece[currentChecked][i]>0)
					return true;
			XOffset++;
		}
		currentChecked--;
		checkRow--;
		}
		while(currentChecked >= xtop && checkRow >=0 )
	}
	return false;
}
function moveLeft()
{
	if(currentX - 1 >=0 && !colidesLeft(currentPiece,currentX,currentY))
	{
		currentX--;
	}
	update();
}
function moveRight()
{
	var pieceWidth=findRight(currentPiece)-findLeft(currentPiece) + 1;
	if(currentX + pieceWidth < COLS && !colidesRight(currentPiece,currentX,currentY))
	{
		currentX++;
	}
	update();
}
function movePiece()
{
	if((currentY + (findBottom(currentPiece)-findTop(currentPiece) + 1)) < ROWS
		&& !colides(currentPiece,currentX,currentY))
	{
		currentY++;
	}
	else
	{
		addPieceToBoard(currentPiece);
		currentPiece= getRandomPiece();
		currentX=Math.floor(COLS/2 - (findBottom(currentPiece)-findTop(currentPiece) + 1)/2);
		currentY=-((findBottom(currentPiece)-findTop(currentPiece))+1);
	}
	update();
}
function update()
{
	context.fillStyle=BOARD;
	context.fillRect(0,0,200,400);
	drawBoard();
	drawPiece(currentX,currentY,currentPiece);
}
currentPiece= getRandomPiece();
currentX=Math.floor(COLS/2 - (findBottom(currentPiece)-findTop(currentPiece) + 1)/2);
currentY=-((findBottom(currentPiece)-findTop(currentPiece))+1);
initBoard();
drawBoard();
//addPieceToBoard(currentPiece);
function handle(e)
{
	var key = e.keyCode;
	switch(key)
	{
		case 37:
		moveLeft();
		break;
		case 39:
		moveRight();
		break;
		case 40:
		movePiece();
		break;
		update();
	}
}
document.addEventListener("keydown", handle, false);
setInterval(movePiece,500);