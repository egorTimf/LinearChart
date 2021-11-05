class LinearChart {
  constructor(id, coords) {
    this.id = id;
    this.coords = coords;

  }

  findScope() 
  {
    this.maxY = 0;
    this.maxX = 0;
    this.coords.forEach((coord) => {
      if (coord.x > this.maxX) this.maxX = coord.x;
      if (coord.y > this.maxY) this.maxY = coord.y;
    });
  }


  drawAxisArrows(axis)
  {
    if(axis=='x'){
      this.ctx.lineTo(this.width*0.85, this.height*0.85);
      this.ctx.moveTo(this.width*0.9,  this.height*0.9);
      this.ctx.lineTo(this.width*0.85, this.height*0.95);
    }else if(axis=='y'){
      this.ctx.lineTo(this.width*0.15, this.height*0.15);
      this.ctx.moveTo(this.width*0.1,  this.height*0.1);
      this.ctx.lineTo(this.width*0.05, this.height*0.15);
    }

  }

  signAxes()
  {
    this.ctx.font = `${this.width*0.07}px serif`
    this.ctx.fillText(`X`,this.width*0.91, this.height*0.95);
    this.ctx.fillText(`Y`,this.width*0.05, this.height*0.09);
    
    this.ctx.font = `${this.width*0.03}px serif`

    this.ctx.fillText(`0`,this.width*0.08, this.height*0.93);

    for(let i=1;i<=Math.max(this.maxX,this.maxY);i++){
      this.ctx.fillText(`${i}`,i*this.unitSegm+this.width*0.095, this.height*0.94);
      this.ctx.fillText(`${i}`,this.width*0.07, this.height*0.91-i*this.unitSegm);

      this.ctx.moveTo(i*this.unitSegm+this.width*0.1, this.height*0.89)
      this.ctx.lineTo(i*this.unitSegm+this.width*0.1, this.height*0.91)  

      this.ctx.moveTo(this.width*0.09, this.height*0.9-i*this.unitSegm)
      this.ctx.lineTo(this.width*0.11, this.height*0.9-i*this.unitSegm)
    }
  }

  drawCoordinateAxes(){
    this.ctx.moveTo(this.width*0.1,  this.height*0.9);
    this.ctx.lineTo(this.width*0.1,  this.height*0.1);

    this.drawAxisArrows('y');

    this.ctx.moveTo(this.width*0.1,  this.height*0.9);
    this.ctx.lineTo(this.width*0.9,  this.height*0.9);

    this.drawAxisArrows('x');
    
  }


  createField()
  { 
    this.ctx.beginPath();

    this.unitSegm = Math.trunc(this.width*0.75/Math.max(this.maxX, this.maxY));

    this.drawCoordinateAxes();

    this.signAxes();
    
    this.ctx.stroke();    

    this.ctx.closePath();
  }

  roundSize()
  {
    this.height = this.canvas.offsetHeight;
    this.width = this.canvas.offsetWidth;

    if (this.height>this.width) this.height=this.width;
    else if (this.height<this.width) this.width=this.height;

    if (this.height<300) this.height=300;
    if (this.width<300) this.width=300;

    this.width=Math.floor(this.width/100)*100;
    this.height=Math.floor(this.height/100)*100;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.width = `${this.width}px`;
  }

  drawChart()
  {
    this.ctx.beginPath();
    
    this.ctx.moveTo(this.coords[0].x*this.unitSegm+this.width*0.1, this.height*0.9-this.coords[0].y*this.unitSegm);

    this.coords.forEach((coord) => {
      console.log(`x: ${coord.x} y: ${coord.y}`)
      this.ctx.lineTo(coord.x*this.unitSegm+this.width*0.1, this.height*0.9-coord.y*this.unitSegm);
      this.ctx.stroke();
    });

    this.ctx.closePath();
  }


  render() 
  {
    let canvas = document.getElementById(this.id);
    this.canvas = canvas;

    if (!canvas.getContext) return new Error("Can not find canvas element!");

    const ctx = canvas.getContext("2d");
    this.ctx = ctx;

    this.roundSize();
    this.findScope();   
    this.createField(); 
    this.drawChart();
  }

  setCoords(coords) 
  {
    this.coords = coords;
    this.render();
  }

}
