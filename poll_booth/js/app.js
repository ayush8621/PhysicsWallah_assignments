let poll = {
  question:"What should be the timing for tomorrow's class?",
  answers:[
    "After 5PM", "Before 5PM","No Class"
  ],
  pollcount:30,
  answersweight:[10,15,5],
  selectedAnswer:-1
};

let pollDom = {
  question: document.querySelector(".poll .question"),
  answers: document.querySelector(".poll .answers")
};

pollDom.question.innerText = poll.question;
pollDom.answers.innerHTML = poll.answers.map(function(answer,i){
  return (
  `
  <div class="answer" onClick="markAnswer('${i}')">
    ${answer}
    <span class="percentage-bar"></span>
    <span class="percentage-value"></span>
  </div>
 `
);

}).join("");

function markAnswer(i){
  poll.selectedAnswer = +i;
  try{
    document.querySelector(".poll .answers .answer .selected").classList.remove("selected");
  } catch(msg){}
    document.querySelectorAll(".poll .answers .answer")[i].classList.add("selected");
    showResults();
}

function showResults(){
  let answers = document.querySelectorAll(".poll .answers .answer");
  for(let i=0;i<answers.length;i++){
    let percentage=0;
    if(i==poll.selectedAnswer){
      percentage= Math.round(
        (poll.answersweight[i]+1) *100 / (poll.pollcount +1)
      );
    } else{
      percentage= Math.round(
        (poll.answersweight[i]) *100 / (poll.pollcount +1)
      );
    }
    answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
    answers[i].querySelector(".percentage-value").innerText = percentage + "%";
}
}
