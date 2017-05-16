class HoverCard  {
    constructor(src,color,text) {
        this.src = src
        this.color = color
        this.text = text
        this.img = document.createElement('img')
        document.body.appendChild(this.img)
        this.clipW = 0
        this.dir = 0
        this.textComponents = []
    }
    render() {
        const context = this.context
        const canvas = this.canvas
        const w = this.w,h = this.h
        const image = this.image
        context.clearRect(0,0,w,h)
        context.drawImage(image,0,0,w,h)
        context.save()
        context.beginPath()
        context.rect(0,0,this.clipW,h)
        context.clip()
        context.fillStyle = this.color
        context.globalAlpha = 0.5
        context.fillRect(0,0,w,h)
        this.textComponents.forEach((textComponent)=>{
            textComponent.render(context)
        })
        context.restore()
        this.img.src = canvas.toDataURL()
        console.log("rendering")
    }
    startAnimating() {
        //console.log(this.dir)
        const interval = setInterval(()=>{
            console.log(this.clipW)
            this.clipW += this.dir *(this.w/10)
            if((this.clipW > this.w && this.dir == 1) || (this.clipW <0 && this.dir == -1)) {
                if(this.clipW > this.w) {
                    this.clipW = this.w
                }
                else if(this.clipW < 0) {
                    this.clipW = 0
                }
                this.dir = 0
            }
            this.render()
            if(this.dir == 0) {
                clearInterval(interval)
            }
        },10)
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () =>{
            this.w = this.image.width
            this.h = this.image.height
            this.canvas.width = this.w
            this.canvas.height = this.h
            this.context.font = this.context.font.replace(/\d{2}/,`${this.h/14}`)
            this.createTextComponents()
            this.render()

        }
        this.img.onmouseover = (event)=>{
            if(this.clipW == 0 && this.dir == 0) {
                this.dir = 1
                this.startAnimating()
            }
        }
        this.img.onmouseout = (event) => {
            if(this.clipW == this.w && this.dir == 0) {
                this.dir = -1
                this.startAnimating()
            }
        }
    }
    createTextComponents() {
        const context = this.context
        const w = this.w,h = this.h
        const words = this.text.split(" ")
        var msg = "",y = h/5
        var exceededLimit = false
        for(var i=0;i<words.length;i++) {
            if(context.measureText(words[i]+" "+msg).width > 9*w/10) {
                if(y+h/20>=9*h/10) {
                    this.textComponents.push(new TextComponent(msg+"...",w/10,y))
                    exceededLimit = true
                    break
                }
                this.textComponents.push(new TextComponent(msg,w/10,y))
                y += h/11
                msg = words[i]
            }
            else {
                msg += " "+words[i]

            }
        }
        if(!exceededLimit) {
            this.textComponents.push(new TextComponent(msg,w/10,y))
        }
    }
}
class TextComponent {
    constructor(text,x,y) {
        this.x = x
        this.y = y
        this.text = text
    }
    render(context) {
        //console.log(this.text)
        context.globalAlpha = 1
        context.fillStyle = 'white'
        context.fillText(this.text,this.x,this.y)
    }
}
