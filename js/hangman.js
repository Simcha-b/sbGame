let options = {
    fruits: ['Apple', 'Banana', 'Mango', 'Lemon', 'Grape'],
    transportation: ['Bicycle', 'Airplane', 'Scooter', 'Subway', 'Sailboat'],
    countries: ['Argentina', 'Indonesia', 'Switzerland', 'Kazakhstan', 'Philippines'],
  };
  const letterContainer= document.querySelector("#letter-container");
  let leeters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  function criateleters(){
    for (let i = 0; i < leeters.length; i++) {
        let div = document.createElement("button");
        div.textContent = leeters[i];
        div.classList.add(leeters[i]);
        letterContainer.append(div);
    }
  }
  criateleters();
  
  function userInputCriate(){
    
  }
