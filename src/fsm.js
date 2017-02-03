class FSM {

    constructor(config) {
      if (config){
          this._state=config.initial;
          this._config=config;
          this._history=[this._state];
          this._historyPos=0;
      }
      else {
        throw new Error('config isn\'t passed');
      }

    }

    getState() {
      return this._state;
    }

    changeState(state) {
      var tmp=false;
      for(var key in this._config.states) {
        if (key == state) {
          tmp=true;
        }
      }
      if (tmp){
        this._state=state;
        this._historyPos++;
        this._history.splice(this._historyPos,this._history.length,this._state);
      }
      else{
        throw new Error('state isn\'t exist');
      }
      return this;
    }

    trigger(event) {
      for (var state in this._config.states){
        if (state==this._state){
          var curentEvent=this._config.states[state].transitions;
          for (var ev in curentEvent){
            if (ev==event){
              this._state=curentEvent[ev];
              this._historyPos++;
              this._history.splice(this._historyPos,this._history.length,this._state);
              return this;
            }
          }
        }
      }
      throw new Error('current state isn\'t exist');
    }

    reset() {
      this._state=this._config.initial;
      this._historyPos=0;
      this._history=this._state;
      return this;
    }

    getStates(event) {
      var res=[];
      if (!event){
          for (var state in this._config.states){
            res.push(state);
          }
      }else{
        for (var state in this._config.states){
          var curentState=this._config.states[state].transitions;
          var flag=false;
          for (var ev in curentState){
            if (ev==event){
              flag=true;
            }
          }
          if (flag){
            res.push(state);
          }
        }
      }
      return res;
    }

    undo() {
      if (this._historyPos>0){
        this._historyPos--;
        this._state=this._history[this._historyPos];
        return true;
      }else{
        return false;
      }
    }

    redo() {
      if (this._historyPos<this._history.length-1){
        this._historyPos++;
        this._state=this._history[this._historyPos];
        return true;
      }else{
        return false;
      }
    }

    clearHistory() {
      this._history=[];
      this._historyPos=-1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
