class LS{constructor(){}guardarFavorito=t=>{const o=JSON.parse(localStorage.getItem("favoritos"))??[];localStorage.setItem("favoritos",JSON.stringify([...o,t]))};consultarStorage=t=>(JSON.parse(localStorage.getItem("favoritos"))??[]).some(o=>o.id===t);eliminarFavorito=t=>{const o=(JSON.parse(localStorage.getItem("favoritos"))??[]).filter(o=>o.id!==t);localStorage.setItem("favoritos",JSON.stringify(o))}}export default LS;
//# sourceMappingURL=localStorage.js.map
