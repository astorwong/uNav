function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [ posX, posY ];
  }
  else
  {
    return [ oElement.x, oElement.y ];
  }
}

function GetCoordinates(e)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(container);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
  {
    PosX = e.clientX + document.body.scrollLeft
    + document.documentElement.scrollLeft;
    PosY = e.clientY + document.body.scrollTop
    + document.documentElement.scrollTop;
  }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];

  document.getElementById("x").innerHTML = PosX;
  document.getElementById("y").innerHTML = PosY;

  var table = document.getElementById("coordinatesTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = PosX;
  cell2.innerHTML = PosY;
  var roomNum = prompt("What's the room number?")
  if (roomNum != null) {
    cell3.innerHTML = roomNum;
  }
  var color = '#FF0000';
  var size = '5px';

  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.fillStyle="#FF0000";
  context.fillRect( PosX, PosY, 5, 5 );

}

function ImportCoordinates()
{
  var color = '#FF0000';
  var size = '5px';

  var table = document.getElementById("coordinatesTable");
  for (var i = 1, row; row = table.rows[i]; i++) {
     PosX = row.cells[0].innerHTML;
     PosY = row.cells[1].innerHTML;

     var canvas = document.getElementById("myCanvas");
     var context = canvas.getContext("2d");
     context.fillStyle="#FF0000";
     context.fillRect( PosX, PosY, 5, 5 );
   }
}
