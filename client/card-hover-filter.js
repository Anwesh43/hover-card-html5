class HoverCard  {
    constructor(src,color,text) {
        this.src = src
        this.color = color
        this.text = text
        this.img = document.createElement('img')
        document.body.appendChild(img)
        this.clipW = 0

    }
    render() {
        const context = this.context
        const canvas = this.canvas
        const w = this.w,h = this.h
        const image = this.image
        context.clearRect(0,0,w,h)
        context.drawImage(image,0,0,w,h)
        context.beginPath()
        context.rect(0,w-this.clipW,this.clipW,h)
        context.clipPath()
        context.fillStyle = this.color
        context.globalAlpha = 0.5
        context.fillRect(0,0,w,h)
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () =>{
            this.w = image.width
            this.h = image.height
            this.canvas.width = this.w
            this.canvas.height = this.h
            this.render()

        }
    }
}
