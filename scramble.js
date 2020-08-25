
/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
/*
 - array of words
 -minimum 10 words
 */

const app = new Vue({
  el: "#app",
  data: {
    words: ['hello' ,'car','dog','pig','cat'],
    points: 0,
    strike:0,
    maxStrikes: 3,
    pass: 3,
    currentScrambleWord: 'car',
    currentWord: '',
    guessedWord: '', 
    restartMessage: '',
    successMessage: "Correct. Next Word!",
    wrongMessage: "Wrong. Try Again!",
    success: false,
    wrong: false,
    restart: false
  }, 
  
  methods: {
    keyupCheck: function(e){
      if(e.keyCode==13) // (Enetr Provided by Parth Chauhan)
      {
        this.success = false
        this.wrong = false
        if(this.currentWord == this.guessedWord.toLowerCase().trim()){
          this.points++
          this.words.shift()
          this.currentWord = this.words[0]
          this.currentScrambleWord = shuffle(this.currentWord)
          this.guessedWord = null
          this.success = true
        } else {
          this.strike++
          this.wrong = true
          if(this.strike >= this.maxStrikes){
            this.restartMessage = "Maximum Strikes Reached";
            this.restart = true
          }
          this.guessedWord = null
        }
      }
    },
    passButton: function (e) {
      if(this.pass>0){
        this.pass--
        this.words.shift()
        this.currentWord = this.words[0]
        this.currentScrambleWord = shuffle(this.currentWord)
        this.guessedWord = null
        alert("Do You want to Pass word")
      } else {
        alert("No Pass Left!")
      }
    },
    restartGame: function(e) {
      this.words = shuffle(words)
      this.points = 0
      this.strike = 0
      this.pass = 3
      this.currentWord = this.words[0]
      this.currentScrambleWord = shuffle(this.currentWord)
      this.guessedWord = null
    }
  },
  mounted: function() {
    const ls = localStorage.getItem('scramble')
    if (ls) {
      const scramble = JSON.parse(ls)
      this.words = scramble.words
      this.points = scramble.points
      this.strike = scramble.strike
      this.pass = scramble.pass
      this.currentWord = scramble.currentWord
      this.currentScrambleWord = scramble.currentScrambleWord
    }
    else{
      this.words = shuffle(words)
      this.currentWord = this.words[0]
      this.currentScrambleWord = shuffle(this.currentWord)
    }
  },
  watch: { 
    points: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    },
    strike: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    },
    words: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    },
    pass: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    }
  },
})
