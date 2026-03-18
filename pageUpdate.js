/**
 * Passes in the Lectora group and displays all it's children.
 * @param {*} group refers to the Lectora object being referred to
 * @returns all the items that are within the Lectora group 
 * 
 */
function pageUpdate(group){
    let children=[];
    group.childArray.forEach(x=>{
        let loc = group.childArray.indexOf(x);
        
        let childObj = triv$("#"+x, getDisplayDocument());
        
        children[loc] = childObj;
        triv$(childObj).css("visibility","inherit");
        if(childObj[0].classList.contains("a_box")){
            setOpacity(childObj,VaropacityValue.defVal);
        }
        
        if(childObj[0].classList.contains("luckyCharm")){
            let regex= new RegExp(childObj[0].id);
            if(!regex.test(VariconList.value)){
                updateProgress(childObj[0].id);
            }
        }
        
        
    });
    
    return children;
}

/**
 * set the opacity for an object
 * @param {*} object item that will have it's opacity affected
 * @param {*} opacity opactity that will be set
 * @returns 
 */
function setOpacity(object,opacity){
    return triv$(object).css("opacity",opacity);
}


/**
 * Updates the trackers for the user's progress
 * @param {*} progressValue current page to be added for progress
 * @returns 
 */
function updateProgress(progressValue){
    VariconList.add(progressValue);
    
    if(VarcurrentCount.value < String(VariconTotal.value)){
        VarcurrentCount.add("1");
    }
    
    
    if(VarcurrentCount.value === String(VariconTotal.value) && VarprojectGated.value ==="1"){
        VarpageGated.set("0");
        return VarpageGated;
    }
    
}
/**
 * Updates the navagation bar to display the proper item
 * @param {*} button the navbar button to be updated
 * @param {*} value the value to be represented
 * @returns 
 */
function UpdateNavBar(button,value){
    switch(value){
        case value="fc":
            button.div.classList.add("flashcard");           
            button.div.children[0].children[1].innerText ="";            
            break;
        case value="cyp":
            button.div.classList.add("cyp");           
            button.div.children[0].children[1].innerText ="";
            break;
        case value="f":
            button.div.classList.add("final");           
            button.div.children[0].children[1].innerText ="";
            break;
        default:
            //buttonText = value;
            break;
       
    }
    return button;

}

/**
 * Jumps to a specific page when the navbar button is clicked
 * @param {*} currentChapter current chapter that the page live in
 * @param {*} currentPage  the page that we are on
 * @param {*} value the number of pages to progress
 * @returns 
 */
function jumpPage(currentChapter,currentPage,value){
    let np = parseInt(currentPage.value)+value;
   return trivExitPage("a001_"+currentChapter.title+"_page_"+np+".html",true);    

}

//CYP hover state

document.addEventListener("DOMContentLoaded", function () {

    var hoverClass = "quiz-can-hover";
    var body = document.body;

    // 🔧 CONFIG – change per page:
    // MCQ page  : isTrueFalsePage = false, maxAttempts = 2
    // T/F page  : isTrueFalsePage = true,  maxAttempts = 1
    var isTrueFalsePage = false;  // 👉 SET THIS TO true ON TRUE/FALSE PAGES
    var maxAttempts     = isTrueFalsePage ? 1 : 2;

    // Hover ON at start
    body.classList.add(hoverClass);

    // Track number of submits for this question
    var attemptsUsed = 0;

    function updateHoverBasedOnFeedback() {
        // For True/False with 1 attempt we don't rely on feedback at all:
        if (isTrueFalsePage) {
            // Hover OFF permanently after first submit
            if (attemptsUsed >= 1) {
                body.classList.remove(hoverClass);
            }
            return;
        }

        // MCQ logic (same pattern as before)
        if (typeof getDisplayDocument !== "function") return;

        var displayDoc = getDisplayDocument();
        if (!displayDoc) return;

        var feedbacks = displayDoc.querySelectorAll(".feedback1");
        var correctVisible = false;

        feedbacks.forEach(function (el) {
            var vis = el.style.visibility; // "hidden" or "inherit"
            if (vis !== "hidden") {
                var text = (el.textContent || "").trim();
                if (/Congratulations!/i.test(text)) {
                    correctVisible = true;
                }
            }
        });

        // MCQ: Turn hover OFF if correct OR out of attempts
        if (correctVisible || attemptsUsed >= maxAttempts) {
            body.classList.remove(hoverClass);
        } else {
            body.classList.add(hoverClass);
        }
    }

    document.addEventListener("click", function (e) {

        // 🟦 SUBMIT (works for both MCQ and T/F)
        if (e.target.closest(".quiz-submit")) {
            attemptsUsed += 1;
            if (attemptsUsed > maxAttempts) {
                attemptsUsed = maxAttempts;
            }

            // For T/F, just kill hover after first submit.
            if (isTrueFalsePage) {
                body.classList.remove(hoverClass);
                return; // No need to check feedback
            }

            // For MCQ, use the feedback-based logic
            setTimeout(updateHoverBasedOnFeedback, 60);
        }

        // 🔄 RESET (MCQ only – T/F has no reset button)
        if (!isTrueFalsePage && e.target.closest(".quiz-reset")) {

            // DO NOT reset attemptsUsed – they already used a try.
            // Only re-enable hover if they still have attempts left.
            if (attemptsUsed < maxAttempts) {
                body.classList.add(hoverClass);
            } else {
                body.classList.remove(hoverClass);
            }

            setTimeout(updateHoverBasedOnFeedback, 0);
        }

    });

});
