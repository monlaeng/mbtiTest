const main = document.querySelector("#main");  //main이라는 아이디 불러오기
const qna = document.querySelector("#qna");     //qna라는 아이디 불러오기
const result = document.querySelector("#result");   //result라는 아이디 불러오기

const endPoint = 10;

const select = [0,0,0,0];

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector(".aBox");
    var answer = document.createElement('button');

    answer.classList.add('answerList');     //답변마다 클래스 추가해주기
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');

    answer.classList.add('fadeIn');         //버튼에 서서히 등장하는 애니메이션 부가 

    a.appendChild(answer);                  //answer가 a에 소속될 수 있도록 만들어준다.
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');        //버튼 3개 선택
        for(let i=0; i<children.length; i++){
            children[i].disabled = true;        //버튼 비활성화 시키기

            children[i].style.webkitAnimation = "fadeOut 0.5s";     //버튼에 서서히 사라지는 애니메이션 부가
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{                                    //사라지자마자 none이 되는 것을 막기위해 setTimeout 함수 작성
            var target = qnaList[qIdx].a[idx].type;         //타겟 타입별 늘려주기

            for(let i=0; i<target.length; i++){             //타겟에 들어있는 모든 타입 1씩 증가시키기
                select[target[i]]+=1 
            }
            
            for(let i=0; i<children.length;i++){
                children[i].style.display = 'none';         //버튼들 안보이게 해줌
            }
            goNext(++qIdx);
        }, 450)
    }, false)

}


function calResult(){
    var result = select.indexOf(Math.max(...select));       //select의 최댓값의 인덱스 선택
    return result;      //결과 반환
}

function setResult(){
    let point = calResult();        //point result 값 담아주기

    const resultNameIntro = document.querySelector('.resultIntro');
    resultNameIntro.innerHTML = infoList[point].nameIntro;

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');              //이미지 넣기
    const imgDiv = document.querySelector("#resultImg");
    var imgURL = 'img/image-' + point + '.png';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc1 = document.querySelector('.resultDesc1');
    const resultDescTitle1 = document.querySelector('.resultDescTitle1');
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;

    const resultDesc2 = document.querySelector('.resultDesc2');
    const resultDescTitle2 = document.querySelector('.resultDescTitle2');
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;

}

function goResult(){
    qna.style.webkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.webkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    }, 450)

    setResult();
   
}

function goNext(qIdx){
    if(qIdx == endPoint){       //질문이 다 끝나면 result페이지로 이동
        goResult();
        return;
    }
    
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;           //출력되는거 확인 가능

    for(let i in qnaList[qIdx].a)       //qnaList[qIdx].a만큼 반복
    {
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);      //질문 더하는 함수
    }
    var countStatusNum = document.querySelector('.countStatus');        //진행도 만들어주기
    countStatusNum.innerHTML = (qIdx+1)+"/"+endPoint;

    var status = document.querySelector('.statusBar');          //상태바 만들어주기
    status.style.width = (100/endPoint) * (qIdx+1)+"%";

}

function start(){                               //시간차 주면서 흐려지며 자연스럽게 페이지 변경시키기
    main.style.webkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.webkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450)
   
   
}