import { loadProductById } from "../services/Menu.js";

export class DetailsPage extends HTMLElement {
    constructor() {
        super();
        
        this.root = this.attachShadow({mode : "open"});
        const styles = document.createElement("style");
        this.root.appendChild(styles);

        const template = document.getElementById("details-page-template");
        this.root.appendChild(template)

        async function loadCSS() {
         const request = await fetch("components/DetailsPage.css");
         styles.textContent =await  request.text();
        }
        loadCSS();

    }

   connectedCallback() {
    this.renderData();
   }
  async renderData() {
    if(this.dataset.id) {
         this.product = await loadProductById(this.dataset.id);
         this.root.querySelector("h2").textContent = this.product.name;
         this.root.querySelector("img").src = `/data/images/${this.product.image}`;
         this.root.querySelector(".description").textContent = this.product.description;
         this.root.querySelector(".price").textContent = `$ ${this.product.price.toFixed(2)}`;
         this.root.querySelector("button").addEventListener("click" , event => {
            app.router.go('/order');
         })
    } else {
        alert("invalid id")
    }
  }
}
customElements.define("details-page" , DetailsPage);