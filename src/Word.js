// import { observable } from 'mobx';


function isString(value) {
    return typeof value === "string" || value instanceof String;
}

class Word {
    constructor(canvasWidth,
        canvasHeight,
        wordText,
        ctx,
        leftPadding,
        fontHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.text = wordText;
        this.ctx = ctx;
        this.leftPadding = leftPadding;
        this.fontHeight = fontHeight;

        this.x = Math.floor(
            Math.random() * (canvasWidth - leftPadding + 1) + leftPadding
        );
        this.y = 10;
        this.completed = false;
        this.hasTypedPart = false;

    }
    accomplished = (ctx) => {
        this.completed = true;
    }

    correctedX = () => {
        const width = this.ctx.measureText(this.text).width;
        const oversizeX = this.x + width - (this.canvasWidth - this.leftPadding);
        if (oversizeX > 0) {
            return this.x - oversizeX;
        } else {
            return this.x;
        }
    }


    typedText = (typed) => {
        if (typed.length > 0) {
            let typedWord = typed.join("");
            if (isString(this.text)) {
                if (this.text.startsWith(typedWord)) {
                    return typedWord;
                }
            }
            
        }
        return "";
    }

    outOfBound = () => {
        return this.canvasHeight + this.fontHeight < this.y;
    }
    update = (typed) => {
        this.y = this.y + 1;
        this.ctx.font = this.fontHeight + "px Arial";

        let typedPart = this.typedText(typed);
        if (typedPart.length > 0) {
            this.hasTypedPart = true;

            if (typedPart === this.text) {
                this.accomplished(this.ctx);
            } else {
                // console.log("typed part of "+ this.text);
                this.ctx.fillStyle = "yellow";
                let x = this.correctedX();
                this.ctx.fillText(typedPart, x, this.y);
                this.ctx.fillStyle = "red";
                let remainingPart = this.text.substring(typedPart.length, this.text.length);
                this.ctx.fillText(remainingPart,
                    x + this.ctx.measureText(typedPart).width,
                    this.y);
            }
        }
        else {
            this.hasTypedPart = false;
            this.ctx.fillStyle = "red";
            this.ctx.fillText(this.text, this.correctedX(), this.y); 
        }
    } 
}

export default Word;