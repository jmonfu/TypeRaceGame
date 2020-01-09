import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const SNIPPETS = [
    'Bears, beats, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hang out?  The Foo Bar!'
  ];

  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const updateUserText = event => {
    setUserText(event.target.value);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
   }

   // Note the double arrow syntax. This sets up chooseSnippet to return a callback function itself. 
   // For example, chooseSnippet(0) returns a function itself, that will end up calling setSnippet(SNIPPETS[0]);. 
   const chooseSnippet = snippetIndex => () => {
     setSnippet(SNIPPETS[snippetIndex]);
    //  When the user selects a snippet, this should add a startTime. Therefore, we’ll use setGameState to set the value of gameState.startGame.
    // Note that when you use the setter method returned from the useState hook, you must provide an entirely new object or value.  
    // Therefore, we’ll create an object that consists of all the current data in the gameState object, using the spread operator. 
    // Then we’ll override the startTime field to new Date().getTime():  
    setGameState( {...gameState, startTime: new Date().getTime() });
   };
   
  return (
    <div className="App">
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      { snippet }
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      {/* onClick calls chooseSnippet, and passes in the index. */}
      {/* This results in a callback function. This returned callback function will internally call setSnippet with the passed index.  */}
      {/* why was it coded this way?? */}
      {/* The onClick handler must reference a function, and not call the function itself. It’s one of the biggest gotchas with React: 
      calling a function within the JSX can trigger state changes that end up re-triggering another render (a render is triggered when component
       state changes). Therefore, the re-render goes through the JSX, and re-calls the function again. 
       This then triggers a state changes, recalling render — and dang, your app is in an infinite loop */}
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)} ...
          </button>
        ))
      }
    </div>
  );
}

export default App;
