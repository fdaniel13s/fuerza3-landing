export default class ScratchCard {
  el: HTMLElement;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  revealed = false;
  options: any;
  pointerDown = false;
  lastPos = { x: 0, y: 0 };
  dpr = 1;

  constructor(el: HTMLElement, options = {}){
    this.el = el;
    this.options = Object.assign({ width: 340, height: 200, cover: 'gradient', threshold: 55 }, options);
    this.init();
  }

  init(){
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role','presentation');
    const { width, height } = this.options;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx = this.canvas.getContext('2d');
    if(!this.ctx) return;
    this.ctx.scale(this.dpr, this.dpr);

    // draw cover
    if(this.options.cover === 'image'){
      const base = import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;
      const img = new Image();
      img.src = `${base}images/scratch-cover.png`;
      img.onload = () => {
        this.ctx && this.ctx.drawImage(img, 0, 0, width, height);
      };
    } else {
      // gradient
      const g = this.ctx.createLinearGradient(0,0,width,height);
      g.addColorStop(0, 'rgba(11,107,35,0.95)');
      g.addColorStop(1, 'rgba(30,170,62,0.95)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0,0,width,height);
    }

    this.ctx.globalCompositeOperation = 'destination-out';

    // events
    this.canvas.addEventListener('pointerdown', this.onDown.bind(this));
    window.addEventListener('pointerup', this.onUp.bind(this));
    this.canvas.addEventListener('pointermove', this.onMove.bind(this));

    this.el.appendChild(this.canvas);

    // throttle percentage check
    this._checkInterval = window.setInterval(()=> this.checkRevealed(), 300);
  }

  onDown(e: PointerEvent){
    this.pointerDown = true;
    this.lastPos = this._getPos(e);
  }
  onUp(){
    this.pointerDown = false;
  }
  onMove(e: PointerEvent){
    if(!this.pointerDown || !this.ctx) return;
    const pos = this._getPos(e);
    this._drawCircle(pos.x, pos.y);
    this.lastPos = pos;
  }

  _getPos(e: PointerEvent){
    const rect = this.canvas!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  _drawCircle(x:number, y:number){
    if(!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 18, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  _checkInterval: any = null;
  checkRevealed(){
    if(this.revealed || !this.canvas || !this.ctx) return;
    try{
      const { width, height } = this.options;
      const imageData = this.ctx.getImageData(0,0,width,this.canvas.height/this.dpr);
      let clear = 0;
      for(let i=0;i<imageData.data.length;i+=4){
        if(imageData.data[i+3] === 0) clear++;
      }
      const total = (imageData.data.length/4);
      const percent = Math.round((clear/total)*100);
      const ev = new CustomEvent('scratch:progress', { detail: { percent }});
      this.el.dispatchEvent(ev);
      if(percent >= this.options.threshold){
        this.revealed = true;
        this.el.dispatchEvent(new CustomEvent('scratch:revealed'));
        // stop interval
        if(this._checkInterval) window.clearInterval(this._checkInterval);
      }
    }catch(err){
      // ignore
    }
  }

  reveal(){
    if(!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0,0,this.canvas.width/this.dpr,this.canvas.height/this.dpr);
    this.revealed = true;
    this.el.dispatchEvent(new CustomEvent('scratch:revealed'));
    if(this._checkInterval) window.clearInterval(this._checkInterval);
  }

  reset(){
    if(this.canvas && this.ctx){
      const { width, height } = this.options;
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.clearRect(0,0,width,height);
      this.ctx.globalCompositeOperation = 'destination-out';
      this.revealed = false;
    }
  }
}
