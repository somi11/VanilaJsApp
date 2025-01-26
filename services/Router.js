const Router = {
    init : () => {
      document.querySelectorAll("a.navlink").forEach(a => {
        a.addEventListener("click" , event => {
            event.preventDefault();
            const url = event.target.getAttribute("href");
           
            Router.go(url);
        })
      })
     
      window.addEventListener("popstate" , event => {
        Router.go(event.state.route , false);
      })

      Router.go(location.pathname)
    } ,
    go: ( route , addToHistory = true) => {
        console.log("will go to" , route);
        if(addToHistory) {
            history.pushState({route} , "" , route)
        }
        let pageElement = null
        switch(route) {
            case "/" :
         pageElement = document.createElement("menu-page");
            break;
            case "/order":
        pageElement = document.createElement("order-page");
            break;
        default:
            if(route.startsWith("/product-")){
                pageElement = document.createElement("details-page");
                const paramId = route.substring(route.lastIndexOf("-") + 1);
                pageElement.dataset.id = paramId;
            }
        }
        if(pageElement) {
            const cache = document.querySelector("main");
            cache.innerHTML = "";
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            const errorPage = document.querySelector("main");
            errorPage.innerHTML = `<h1> Page is not Found</h1>`;
        }

    }
}
export default Router;