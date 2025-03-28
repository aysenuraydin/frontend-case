document.addEventListener("DOMContentLoaded", () => {
    const scroll_top= document.getElementById("scrollTop");
    scroll_top.style.display = "none";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    scroll_top.addEventListener("click",scrollToTop)

    window.addEventListener("scroll", ()=> {
        if(window.scrollY > 700){
            scroll_top.style.display="block";
        }else{
            scroll_top.style.display="none";
        }
    })
})

