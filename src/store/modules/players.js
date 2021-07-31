import router from "../../router";
import wordbank from "./wordbank"

const state = () => ({
  players: [
    {id: 1, name: "Player 1", word: null, isImposter: false, isAlive: true}, 
    {id: 2, name: "Player 2", word: null, isImposter: false, isAlive: true}, 
    {id: 3, name: "Player 3", word: null, isImposter: false, isAlive: true},
    {id: 4, name: "Player 4", word: null, isImposter: false, isAlive: true},
  ],
  nextPlayer: 5,
  playerCount: 4,
  wordbank
})

const getters = {
  returnPlayers: () => {
    return this.players;
  }
}

const mutations = {
  addPlayer: (state) => {
    if (state.players.length < 20) {
      state.players.push({id: state.nextPlayer, name: `Player ${state.nextPlayer}`, word: null, isImposter: false, isAlive: true})
      state.nextPlayer++;
      state.playerCount++;
    }
  },
  removePlayer: (state) => {
    if (state.players.length > 2) {
      state.players.pop();
      state.nextPlayer--;
      state.playerCount--;
    }
  },
  changePlayerName: (state, {id, newName}) => {
    for (const player of state.players) {
      if (player.id === id) {
        player.name = newName;
      }
    }
  },
  assignRandomWords: function (state) {
    const wordbanklength = state.wordbank.length - 1 ;
    let randomIndex = Math.floor(Math.random() * wordbanklength);
    const randomWords = [state.wordbank[randomIndex][0], state.wordbank[randomIndex][1]];
    for (const player of state.players) {
      player.word = randomWords[0];
      player.isImposter = false;
      player.isAlive = true;
    }
    const imposterIndex = Math.floor(Math.random() * state.players.length)
    state.players[imposterIndex].word = randomWords[1];
    state.players[imposterIndex].isImposter = true;
    state.playerCount = state.players.length;
  },
  executePlayer: function (state, userID) {
    for (const player of state.players) {
      if (player.id === userID) {
        player.isAlive = false;
        state.playerCount--;
        if (player.isImposter) {
          router.push("/gameends")
        } else if (state.playerCount == 2) {
          router.push("imposterwins")
        } else {
          router.push("/gamecontinues")
        }
      }
    }
  }
  // selectRandomName: function (state) {
  //   const randomIndex = Math.floor(Math.random() * state.players.length)
  //   return state.players[randomIndex].name;
  // }
}

export default {
  state,
  getters,
  mutations,
}