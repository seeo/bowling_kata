import { Exception } from "handlebars";

export class Game {
    constructor() {
        this._currentFrame = 0;
        this._frames = [new Frame()];
    }

    roll(value) {
        if (!this._frames[this._currentFrame].is_full()) {
            this._frames[this._currentFrame].add_roll(value);
        } else {
            this._frames.push(new Frame());
            this._currentFrame += 1;
            this._frames[this._currentFrame].add_roll(value);
        }
    }

    score() {
        let score = 0;
        for (let i = 0; i < this._frames.length; i++) {

            score += this._frames[i].get_score()

            if (this._frames[i].is_spare()) {
                score += this._frames[i+1].first_roll();
            }
        }
        return score;
    }
}

export class Frame {
    constructor() {
        this._rolls = [];
    }

    first_roll() {
        if (this._rolls[0]) {
            return this._rolls[0];
        }
        return 0;
    }

    get_score() {
        let score = 0;
        if (this._rolls[0]) {
            score += this._rolls[0];
        }
        if (this._rolls[1]) {
            score += this._rolls[1];
        }
        return score;
    }

    add_roll(value) {
        if (this.is_full()) {
            throw new Exception('Frame is full!');
        }
        this._rolls.push(value);
    }

    is_full() {
        if (this._rolls.length === 2) {
            return  true;
        }
        return false;
    }

    is_spare() {
        if (!this.is_full()) {
            return false;
        }

        if (this._rolls[0] === 10) {
            return false;
        }

        if (this._rolls[0] + this._rolls[1] !== 10) {
            return false;
        }

        return true;
    }
}