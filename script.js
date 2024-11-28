score = 0;
cross = true;
const audio=new Audio('./audio/byebye.mp3');
const audio2=new Audio('./audio/gameover.mp3');
audio2.pause();
audio.pause();

audio.addEventListener('ended',()=>{
  audio.currentTime=0;
  audio.play();
}
)
document.onkeydown = function (e) {
  console.log("key code is :", e.keyCode);
  if (e.keyCode == 38 || e.keyCode == 87) {
    dino = document.querySelector('.dino');
    dino.classList.add('animatedino');
    setTimeout(() => {
      dino.classList.remove('animatedino')
    }, 600);
    // here setTimeout function helps to do set interval for the action we are performing.relevance of set time out is that . it helps to do the animation multiple times
  }
  if (e.keyCode == 39) {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = dinoX + 112 + "px";

  }
  if (e.keyCode == 37) {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = (dinoX - 112) + "px";

  }
}
//interval for continuous calculation of offset X & Y
setInterval(() => {
  dino = document.querySelector('.dino')
  gameover = document.querySelector('.gameover')
  obstacle = document.querySelector('.obstacle')
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  // here parsInt is used to get the value in interger other wise it will be in pixel
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
  ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
  oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))
  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);
  console.log(offsetX, offsetY);
  // gameover condition
  if (offsetX < 50 && offsetY < 50) {
    gameover.style.visibility = 'visible';
    obstacle.classList.remove('obstacle-animation');
    audio.pause();
    audio2.play();
  

  } else if (cross && offsetX < 145) {
    score += 1;
    updateScore(score);
    cross = false;
    // stops the count ,since cross if false
    setTimeout(() => {
      cross = true;
      // restart the count after 1 second.

    }, 1000);
    audio.play();
    audio2.pause();
    
  }

  setTimeout(() => {
    // here timeout function avoids the sudden jerking of the dino

    aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
    if(newDur>3){
      newDur = aniDur - 0.01;
    }else{
      newDur=2;
    }
    
    obstacle.style.animationDuration = newDur + 's';
    console.log(newDur)

  }, 3000)



}, 50);


function updateScore(score) {
  document.getElementById("scoreCount").innerHTML = "YOUR SCORE:" + score;

}